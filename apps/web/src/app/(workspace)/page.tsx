import { ConversationWorkspace } from "@/features/conversation/components/conversation-workspace";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1> 今天，想从哪里开始？</h1>
        <p>给想做的事，留一点时间</p>
      </div>
      <ConversationWorkspace />
    </div>
  );
}
