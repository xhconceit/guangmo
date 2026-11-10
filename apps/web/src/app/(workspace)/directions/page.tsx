import { Button } from '@/components/ui/Button'
export default function DirectionsPage() {
  return (
    <section>
      <Button size="sm">查看下一步</Button>
      <Button size="md">确认计划</Button>
      <Button variant="ghost" size="sm">取消</Button>
      <h1>发展方向</h1>
      <p>记录你想长期投入的方向。</p>
    </section>
  )
}
