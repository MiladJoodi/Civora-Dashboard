"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, User, Calendar, Clock } from "lucide-react"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import type { NewsArticle } from "@/data/mock/news"

interface NewsCardProps {
  article: NewsArticle
  onClick: () => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  const isCompany = article.category === "company"

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-orange-200 h-full relative overflow-hidden"
    >
      {article.featured && (
        <div className="absolute top-3 start-3 z-10">
          <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
        </div>
      )}

      <CardContent className="p-5 flex flex-col h-full gap-3">
        {/* Category Badge + Image */}
        <div className="flex items-center justify-between">
          <Badge
            className={
              isCompany
                ? "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100"
                : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
            }
          >
            {isCompany ? "اخبار شرکت" : "اخبار صنعت"}
          </Badge>
          {article.image && (
            <span className="text-2xl" role="img">
              {article.image}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-relaxed">
          {article.title}
        </h3>

        {/* Summary (2-line clamp) */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
          {article.summary}
        </p>

        {/* Spacer to push meta to bottom */}
        <div className="mt-auto" />

        {/* Author + Date row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {toPersianNumber(article.publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 text-gray-500 border-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
