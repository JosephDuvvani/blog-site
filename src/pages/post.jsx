import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sections from "../components/post-sections";
import styled from "styled-components";
import { format } from "date-fns";

const Article = styled.article`
    max-width: 50rem;
    margin: auto;
    padding: 1rem;
`;

const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    margin-block: 0 .5rem;
`;

const Date = styled.div`
    color: grey;
`;

const Main = styled.main`
    --user-font-scale: 1rem - 16px;
    font-size: clamp(1rem, .4626rem + 1.0309vw + var(--user-font-scale), 1.125rem);
    color: hsl(215, 13%, 34%);
    line-height: 1.6;
`;

const Post = () => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
        const url = 'http://localhost:3000' + location.pathname;
        fetch(url)
            .then(res => {
                if (res.status >= 400)
                    throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setLoading(false);
                setPost(data.post);
            })
  }, [])

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {post && 
        <Article>
            <header>
            <Title>{post.title}</Title>
            <Date>{format(post.createdAt, 'MMMM d, yyyy')}</Date>
            </header>
            <Main>
                <Sections sections={post.content.sections} />
            </Main>
        </Article>
      }
    </>
  );
};

export default Post;
