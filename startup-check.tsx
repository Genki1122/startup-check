"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Users, Home, Briefcase } from "lucide-react"

type Post = {
  id: number
  name: string
  ageGroup: string
  occupation: string
  livingArrangement: string[]
  financialIssue: string
  learningTopic: string
  savingsGoal: string
}

const ageGroups = ["10代", "20代", "30代", "40代", "50代以上"]
const occupations = ["会社員", "自営業", "公務員", "学生", "主婦/主夫", "無職", "その他"]
const livingArrangements = ["一人暮らし", "夫婦", "3人以上家族", "その他"]

export default function StartupCheck() {
  const [posts, setPosts] = useState<Post[]>([])
  const [name, setName] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [occupation, setOccupation] = useState("")
  const [livingArrangement, setLivingArrangement] = useState<string[]>([])
  const [financialIssue, setFinancialIssue] = useState("")
  const [learningTopic, setLearningTopic] = useState("")
  const [savingsGoal, setSavingsGoal] = useState("")

  const getIcon = (post: Post) => {
    if (post.livingArrangement.includes("一人暮らし")) return <User className="w-12 h-12 text-primary" />
    if (post.livingArrangement.includes("夫婦")) return <Users className="w-12 h-12 text-primary" />
    if (post.livingArrangement.includes("3人以上家族")) return <Home className="w-12 h-12 text-primary" />
    return <Briefcase className="w-12 h-12 text-primary" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost: Post = {
      id: Date.now(),
      name,
      ageGroup,
      occupation,
      livingArrangement,
      financialIssue,
      learningTopic,
      savingsGoal,
    }
    setPosts([newPost, ...posts])
    setName("")
    setAgeGroup("")
    setOccupation("")
    setLivingArrangement([])
    setFinancialIssue("")
    setLearningTopic("")
    setSavingsGoal("")
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">節活スタートアップチェックシート</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mb-8 bg-white rounded-lg shadow-lg p-6">
        <div>
          <Label htmlFor="name">①名前（ニックネーム可）</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label>②年齢層</Label>
          <div className="flex flex-wrap gap-4 mt-1">
            {ageGroups.map((group) => (
              <div key={group} className="flex items-center">
                <Checkbox
                  id={`age-${group}`}
                  checked={ageGroup === group}
                  onCheckedChange={() => setAgeGroup(group)}
                />
                <Label htmlFor={`age-${group}`} className="ml-2">{group}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="occupation">③職業（任意）</Label>
          <Select value={occupation} onValueChange={setOccupation}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="職業を選択" />
            </SelectTrigger>
            <SelectContent>
              {occupations.map((job) => (
                <SelectItem key={job} value={job}>{job}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>④居住形態</Label>
          <div className="flex flex-wrap gap-4 mt-1">
            {livingArrangements.map((arrangement) => (
              <div key={arrangement} className="flex items-center">
                <Checkbox
                  id={`living-${arrangement}`}
                  checked={livingArrangement.includes(arrangement)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setLivingArrangement([...livingArrangement, arrangement])
                    } else {
                      setLivingArrangement(livingArrangement.filter(item => item !== arrangement))
                    }
                  }}
                />
                <Label htmlFor={`living-${arrangement}`} className="ml-2">{arrangement}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="financialIssue">⑥現在感じている金銭的な問題</Label>
          <p className="text-sm text-muted-foreground mb-2">（例：月末にお金が足りなくなる、貯金ができない、無駄遣いが多いなど）</p>
          <Textarea
            id="financialIssue"
            value={financialIssue}
            onChange={(e) => setFinancialIssue(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="learningTopic">⑦節約活動に関して特に学びたいテーマ</Label>
          <p className="text-sm text-muted-foreground mb-2">(もしあれば教えてください)</p>
          <Textarea
            id="learningTopic"
            value={learningTopic}
            onChange={(e) => setLearningTopic(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="savingsGoal">⑧達成したい具体的な節約目標</Label>
          <p className="text-sm text-muted-foreground mb-2">（例：年間で50万円貯金する、電気代を20%削減するなど）</p>
          <Textarea
            id="savingsGoal"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full">投稿する</Button>
      </form>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-pink-100 bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getIcon(post)}
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{post.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {post.ageGroup} / {post.occupation || "未回答"}
                    </span>
                  </div>
                  <p><strong>居住形態:</strong> {post.livingArrangement.join(", ")}</p>
                  <p><strong>金銭的な問題:</strong> {post.financialIssue}</p>
                  {post.learningTopic && (
                    <p><strong>学びたいテーマ:</strong> {post.learningTopic}</p>
                  )}
                  <p><strong>節約目標:</strong> {post.savingsGoal}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}