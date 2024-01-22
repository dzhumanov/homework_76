import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MessageProps } from "../../types";
import dayjs from "dayjs";

const Message: React.FC<MessageProps> = ({ author, message, date}) => {
  const datetime = dayjs(date).format('YYYY.MM.DD HH:mm')

  return (
    <Card sx={{ marginBottom: 3, marginTop: 3 }}>
      <CardHeader
        title={author}
        subheader={`Date: ${datetime}`}
      />
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
