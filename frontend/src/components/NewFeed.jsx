// import axios from "axios";

import { Container, Spinner, Text } from "@chakra-ui/react";

const NewFeed = () => {
  //   const [articles, setArticles] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchArticles = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://catholicheritage.org/category/vatican-news/feed"
  //         );
  //         setArticles(response.data.items);
  //       } catch (err) {
  //         setError(err.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchArticles();
  //   }, []);

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }

  return (
    <Container textAlign={"center"} pb={10}>
      {/* {articles.map((article) => (
        <div key={article.link}>
          <a href={article.link}>{article.title}</a>
          <p>{article.description}</p>
        </div>
      ))} */}
      <h1>Catholic gospel news today - WORD OF THE DAY!</h1>
      <h2> Good news today: </h2>
      <p>
        <h5>A reading from the Acts of the Apostles</h5>
        <h6>Acts 16:11-15</h6>
        We set sail from Troas, making a straight run for Samothrace,
        <br />
        and on the next day to Neapolis, and from there to Philippi,
        <br />
        a leading city in that district of Macedonia and a Roman colony.
        <br />
        We spent some time in that city.
        <br />
        On the sabbath we went outside the city gate along the river
        <br />
        where we thought there would be a place of prayer.
        <br />
        We sat and spoke with the women who had gathered there.
        <br />
        One of them, a woman named Lydia, a dealer in purple cloth,
        <br />
        from the city of Thyatira, a worshiper of God, listened,
        <br />
        and the Lord opened her heart to pay attention
        <br />
        to what Paul was saying.
        <br />
        After she and her household had been baptized,
        <br />
        she offered us an invitation,
        <br />
        "If you consider me a believer in the Lord,
        <br />
        come and stay at my home," and she prevailed on us.
        <br />
      </p>
      {/* <h3>Reading 1: </h3>
      <h3>Reading 2: </h3>
      <h4>Alleluia: </h4> */}

      {/* // Responsive version */}
      {/* <Text noOfLines={[1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]}>
      A reading from the Acts of the Apostles
      Acts 18:1-8

      Paul left Athens and went to Corinth.
      There he met a Jew named Aquila, a native of Pontus,
      who had recently come from Italy with his wife Priscilla
      because Claudius had ordered all the Jews to leave Rome.
      He went to visit them and, because he practiced the same trade,
      stayed with them and worked, for they were tentmakers by trade.
      Every sabbath, he entered into discussions in the synagogue,
      attempting to convince both Jews and Greeks.

      When Silas and Timothy came down from Macedonia,
      Paul began to occupy himself totally with preaching the word,
      testifying to the Jews that the Christ was Jesus.
      When they opposed him and reviled him,
      he shook out his garments and said to them,
      "Your blood be on your heads!
      I am clear of responsibility.
      From now on I will go to the Gentiles."
      So he left there and went to a house
      belonging to a man named Titus Justus, a worshiper of God;
      his house was next to a synagogue.
      Crispus, the synagogue official, came to believe in the Lord
      along with his entire household, and many of the Corinthians
      who heard believed and were baptized.
      </Text> */}
      {/* <Spinner/> */}
    </Container>
  );
};

export default NewFeed;
