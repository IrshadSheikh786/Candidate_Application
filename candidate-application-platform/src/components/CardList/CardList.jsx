import Card from "../Card/Card";
const CardList = ({ jobs }) => {


  return (
    <div className="main">
      <ul className="cards">
        {jobs.map((job) => (
          <Card   job={job} />
        ))}
      </ul>
      <h3 className="made_by">Made with ♡</h3>
    </div>
  );
};

export default CardList;
