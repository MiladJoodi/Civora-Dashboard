"use client"

import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Building2, Factory, Star, ArrowLeft, User, Calendar, Clock } from "lucide-react"
import { newsArticles, companyNews, industryNews, featuredNews } from "@/data/mock/news"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import Link from "next/link"

const stats = [
  { title: "کل اخبار", value: newsArticles.length, icon: Newspaper, color: "text-orange-500" },
  { title: "اخبار شرکت", value: companyNews.length, icon: Building2, color: "text-blue-500" },
  { title: "اخبار صنعت", value: industryNews.length, icon: Factory, color: "text-green-500" },
  { title: "اخبار ویژه", value: featuredNews.length, icon: Star, color: "text-amber-500" },
]

const quickLinks = [
  { title: "اخبار شرکت", description: "اخبار و اطلاعیه‌های داخلی شرکت سیورا", href: "/news/company", icon: Building2 },
  { title: "اخبار صنعت ساخت‌وساز", description: "آخرین اخبار و تحولات صنعت ساختمان", href: "/news/industry", icon: Factory },
]

export function NewsHub() {
  const recentNews = [...newsArticles]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, 6)

  return (
    <div className="space-y-6">
      <PageHeader
        title="اخبار و اطلاعیه‌ها"
        description="آخرین اخبار شرکت و صنعت ساخت‌وساز"
        Icon={Newspaper}
      />

      <StatsGrid stats={stats} />

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">اخبار ویژه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredNews.map((article) => {
              const isCompany = article.category === "company"
              return (
                <Card
                  key={article.id}
                  className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <CardContent className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <Badge
                          className={
                            isCompany
                              ? "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100"
                              : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
                          }
                        >
                          {isCompany ? "اخبار شرکت" : "اخبار صنعت"}
                        </Badge>
                      </div>
                      {article.image && (
                        <span className="text-2xl" role="img">
                          {article.image}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-relaxed">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap mt-auto">
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
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer h-full">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="rounded-xl bg-orange-50 p-3 shrink-0">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{link.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{link.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 shrink-0 mr-auto" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent News */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">آخرین اخبار</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNews.map((article) => {
              const isCompany = article.category === "company"
              return (
                <div
                  key={article.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {article.image && (
                      <span className="text-xl shrink-0 mt-0.5" role="img">
                        {article.image}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{article.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{article.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400">{toPersianNumber(article.publishDate)}</span>
                    <Badge
                      className={
                        isCompany
                          ? "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100 text-[10px]"
                          : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-[10px]"
                      }
                    >
                      {isCompany ? "شرکت" : "صنعت"}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
