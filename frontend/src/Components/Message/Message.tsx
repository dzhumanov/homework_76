import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MessageProps } from "../../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Message: React.FC<MessageProps> = ({ author, message, date }) => {
  const datetime = dayjs(date, { format: "YYYY-MM-DDTHH:mm:ss.SSSZ" });
  const currentDate = dayjs();
  const formattedDate =
    datetime.year() !== currentDate.year()
      ? datetime.format("YYYY.MM.DD HH:mm")
      : datetime.isSame(currentDate, "day")
      ? datetime.format("HH:mm")
      : datetime.isSame(currentDate.subtract(1, "day"), "day")
      ? "Yesterday"
      : datetime.format("DD.MM HH:mm");

  return (
    <Card sx={{ marginBottom: 3, marginTop: 3 }}>
      <CardHeader title={author} subheader={`Date: ${formattedDate}`} />
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
