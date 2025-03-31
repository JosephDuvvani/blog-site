import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled from "styled-components";

const url = "http://localhost:3000/posts";

const Article = styled.article`
    margin-bottom: 1rem;
    padding: 0 0 2rem;
`;

const Section = styled.section`
    margin-top: 4rem;
`;

const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    color: hsl(215, 27%, 15%);
`;

 const TitleLink = styled(Link)`
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
 `;

const Date = styled.div`
    color: grey;
`;

const Main = styled.main`
    --user-font-scale: 1rem - 16px;
    font-size: clamp(1rem, .4626rem + 1.0309vw + var(--user-font-scale), 1.125rem);
    color: hsl(215, 13%, 34%);
    line-height: 1.6;
    max-width: 50rem;
    margin: auto;
    padding-inline: 1rem;
`;

const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status >= 400) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  return (
    <div>
      {posts && (
        <Main>
            <Section>
                {posts.map((post) => (
                    <Article key={post.id}>
                    <header className="post">
                        <Title>
                            <TitleLink to={`posts/${post.id}`}>{post.title}</TitleLink>
                        </Title>
                        <Date>{format(post.createdAt, "MMMM d, yyyy")}</Date>
                    </header>
                    </Article>
                ))}
            </Section>
        </Main>
      )}
    </div>
  );
};

export default Home;
