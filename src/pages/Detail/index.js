import Spinner from "component/Spinner";
import useSingleGif from "hooks/useSingleGif";
// import useSeo from "hooks/useSEO";
import { Redirect } from "wouter";
import Gif from "../../component/Gif/Gif";
import { Helmet } from "react-helmet";

const Detail = ({ params }) => {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id });
  const title = gif ? gif.title : null;
  // useSeo({ title, description: `Detail of ${title}` });

  console.log(isLoading, isError, gif);
  if (isLoading)
    return (
      <>
        <Spinner />
        <Helmet>
          <title>Loading...</title>
        </Helmet>
      </>
    );
  if (isError) return <Redirect to="/404" />;
  if (!gif) return null;

  return (
    <>
      <Helmet>
        <title>{decodeURI(title)} | Giffy</title>
        <meta name="description" content={`Detail of ${decodeURI(title)}`} />
      </Helmet>
      <h3 className="App-title">{gif.title}</h3>
      <Gif {...gif} />
    </>
  );
};

export default Detail;
