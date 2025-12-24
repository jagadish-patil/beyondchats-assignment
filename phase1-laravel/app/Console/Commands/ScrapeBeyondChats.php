<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Services\BeyondChatsScraper;

class ScrapeBeyondChats extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'app:scrape-beyond-chats';
    protected $signature = 'scrape:beyond-chats';

    /**
     * The console command description.
     *
     * @var string
     */
    // protected $description = 'Command description';
    protected $description = 'Scrape oldest BeyondChats blog articles';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $scraper = new BeyondChatsScraper();

        $articles = $scraper->scrapeOldestArticles(5);
        $count = $scraper->store($articles);

        $this->info("{$count} articles scraped and stored successfully.");
    }
}
