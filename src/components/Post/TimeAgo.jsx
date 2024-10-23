import ViewTimeAgoHook from "../../hook/post/view-time-ago-hook";

const TimeAgo = ({ timestamp }) => {
  const [timeAgo] = ViewTimeAgoHook(timestamp);

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
