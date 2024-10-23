import { formatDistanceToNow, parseISO } from "date-fns";

const ViewTimeAgoHook = (timestamp) => {

  let timeAgo = ''
  if (timestamp) {
      const date = parseISO(timestamp)
      const timePeriod = formatDistanceToNow(date)
      timeAgo = `${timePeriod} ago`
  }

  return [timeAgo]
}

export default ViewTimeAgoHook