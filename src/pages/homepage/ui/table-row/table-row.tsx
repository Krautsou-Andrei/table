"use client";
interface TableRowProps {
  contact: string;
  isUser: boolean;
  number: number;
  score: number;
}

export default function TableRow({
  number,
  isUser,
  score,
  contact,
}: TableRowProps) {
  return (
    <div
      className={`flex gap-2 justify-between items-center w-full font-bold rounded-[20px]  px-5 py-2 leading-none ${
        isUser ? "background-gradient-table-row mt-[2px]" : "bg-card-background"
      }`}
      style={{
        fontFamily: "Montserrat, sans-serif",
        backdropFilter: "blur(30px)",
      }}
    >
      <div
        className={`${isUser ? "text-textColor-third" : "text-white"} w-[60px]`}
      >
        {number}
      </div>
      <div
        className={`${
          isUser ? "text-textColor-third" : "text-white"
        } flex-1 text-[14px]leading-none font-bold items-start`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {score} млд. км
      </div>
      <div
        className={`${
          isUser ? "text-textColor-third" : "text-textColor-secondary"
        } w-[70px] text-[14px] leading-none font-bold  text-ellipsis overflow-hidden`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {`@${contact}`}
      </div>
    </div>
  );
}
