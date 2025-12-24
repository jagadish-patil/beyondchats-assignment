<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class BeyondChatsScraper
{
    public function scrapeOldestArticles(int $limit = 5): array
    {
        $allArticles = [];
        $page = 1;

        while (true) {
            $url = $page === 1
                ? 'https://beyondchats.com/blogs/'
                : "https://beyondchats.com/blogs/page/{$page}";

            $response = Http::get($url);

            if (!$response->successful()) {
                break;
            }

            $crawler = new Crawler($response->body());

            // If no articles found, stop pagination
            if ($crawler->filter('article')->count() === 0) {
                break;
            }

            $crawler->filter('article')->each(function ($node) use (&$allArticles) {
                $titleNode = $node->filter('h2 a');

                if ($titleNode->count() === 0) {
                    return;
                }

                $title = trim($titleNode->text());
                $url   = $titleNode->attr('href');

                $allArticles[] = [
                    'title' => $title,
                    'url'   => $url,
                    'slug'  => \Illuminate\Support\Str::slug($title),
                ];
            });

            $page++;
        }

        // Take the LAST $limit articles (oldest)
        return array_slice($allArticles, -$limit);
    }

    public function store(array $articles): int
    {
        $count = 0;

        foreach ($articles as $data) {
            Article::updateOrCreate(
                ['url' => $data['url']],
                $data
            );
            $count++;
        }

        return $count;
    }
}
