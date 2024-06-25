import { Rate } from "antd";
import { useDeleteCommentMutation } from "../../../Api";
import moment from "moment";
import { CommentTypes, ProductType } from "../../../Api/types";
import s from "./Comment.module.scss";

type Props = {
  pageData: ProductType;
  comment: CommentTypes;
};

const Comment = ({ pageData, comment }: Props) => {
  const [deleteComment] = useDeleteCommentMutation();
  const deleteCommentHandler = (id: number) => {
    deleteComment({
      ...pageData,
      comments: pageData.comments?.filter((item) => item.id !== id),
    });
  };

  return (
    <section className={s.commentWrapper}>
      <div className={s.commentAvatar}>
        {" "}
        <img src="" alt="" />
      </div>
      <div className={s.commentRight}>
        <div className={s.commentTitle}>
          Osbaldo
          <Rate value={pageData.rating} />
        </div>
        <div className={s.commentText}>{comment.text}</div>

        <div
          onClick={() => deleteCommentHandler(comment.id)}
          className={s.commentLike}
        >
          <h3>
            about {moment(comment.timestamp).startOf("minute").fromNow()}{" "}
          </h3>
          <span>Like</span>
          <span>Reply</span>
        </div>
      </div>
    </section>
  );
};

export { Comment };
