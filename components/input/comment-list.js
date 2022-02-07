import classes from './comment-list.module.css';

function CommentList({items}) {
  console.log(items)
  return (
    <ul className={classes.comments}>
      {items.map(v => <li key={v._id}>
            <p>{v.text}</p>
            <div>
              By <address>{v.name}</address>
            </div>
          </li>
      )}
    </ul>
  );
}

export default CommentList;
