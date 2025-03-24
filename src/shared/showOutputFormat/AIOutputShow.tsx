import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIOutputShow({messages}:any) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{messages}</ReactMarkdown>
  )
}
