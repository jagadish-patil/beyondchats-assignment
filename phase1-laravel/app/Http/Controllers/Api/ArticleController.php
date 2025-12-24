<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // GET /api/articles
    public function index()
    {
        //
        return response()->json(Article::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    // POST /api/articles
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string',
            'slug'  => 'required|string|unique:articles,slug',
            'url'   => 'required|url|unique:articles,url',
        ]);

        $article = Article::create($validated);

        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    // GET /api/articles/{id}
    public function show(string $id)
    {
        //
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    // PUT /api/articles/{id}
    public function update(Request $request, string $id)
    {
        //
        $article = Article::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug'  => 'sometimes|string|unique:articles,slug,' . $article->id,
            'url'   => 'sometimes|url|unique:articles,url,' . $article->id,
            'content' => 'sometimes|string',
        ]);

        $article->update($validated);

        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    // DELETE /api/articles/{id}
    public function destroy(string $id)
    {
        //
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }
}
