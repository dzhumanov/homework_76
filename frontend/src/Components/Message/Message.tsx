import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { MessageProps } from "../../types";

const Message: React.FC<MessageProps> = ({ author, message, datetime }) => {
  const date = new Date(datetime);
  let seconds: number = date.getSeconds();
  let secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return (
    <Card sx={{ marginBottom: 3, marginTop: 3 }}>
      <CardHeader
        title={author}
        subheader={`Date: ${date.getDate()}.${date.getMonth()}, ${date.getHours()}:${date.getMinutes()}:${secondsString}`}
      />
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
