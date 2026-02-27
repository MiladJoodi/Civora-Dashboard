"use client"

import { useState } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { NewsCard } from "@/components/News/NewsCard"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Factory, Search, User, Calendar, Clock } from "lucide-react"
import { industryNews } from "@/data/mock/news"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import type { NewsArticle } from "@/data/mock/news"

export function IndustryNews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const filteredArticles = industryNews.filter(
    (article) =>
      article.title.includes(searchTerm) ||
      article.summary.includes(searchTerm) ||
      article.tags.some((tag) => tag.includes(searchTerm))
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="اخبار صنعت ساخت‌وساز"
        description="آخرین اخبار و تحولات صنعت ساختمان"
        Icon={Factory}
      />

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="جستجو در اخبار صنعت..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-colors"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        {toPersianNumber(filteredArticles.length)} خبر یافت شد
      </p>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onClick={() => setSelectedArticle(article)}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Factory className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">خبری با این عبارت یافت نشد</p>
        </div>
      )}

      {/* Article Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                    اخبار صنعت
                  </Badge>
                  {selectedArticle.image && (
                    <span className="text-xl" role="img">
                      {selectedArticle.image}
                    </span>
                  )}
                </div>
                <DialogTitle className="text-lg font-bold leading-relaxed">
                  {selectedArticle.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 leading-relaxed">
                  {selectedArticle.summary}
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {toPersianNumber(selectedArticle.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <div className="text-sm text-gray-700 leading-loose whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {selectedArticle.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-gray-500 border-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
