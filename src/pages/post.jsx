import {  useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sections from "../components/post-sections";
import styled from "styled-components";
import { format } from "date-fns";
import Cookies from "universal-cookie";
import { fetchComments, fetchToken } from "../utils/utils";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../App";

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

const PostDate = styled.div`
    color: grey;
`;

const Main = styled.main`
    --user-font-scale: 1rem - 16px;
    font-size: clamp(1rem, .4626rem + 1.0309vw + var(--user-font-scale), 1.125rem);
    color: hsl(215, 13%, 34%);
    line-height: 1.6;
`;

const CommentSection = styled.div`
    background-color: #56bdbd;
    padding: 1rem;
`;

const Comments = styled.div`
    display: grid;
    gap: 1rem;
`;

const Comment = styled.div`
    background-color: hsl(180, 43%, 98%);
    padding: 1rem;
    border-radius: 6px;
`;

const CommentDate = styled.div`
    font-size: .9rem;
    justify-self: end;
    color: #56bdbd;
`;

const Post = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
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
        
        const checkComments = async () => {
            const cookies = new Cookies(null, {path: '/'});
            let accessToken = cookies.get('jwt-access-blog') ;
            const refreshToken = cookies.get('jwt-refresh-blog');
            
            if (!accessToken && refreshToken) {
                const tokenUrl = 'http://localhost:3000/auth/token'
                const data = await fetchToken(refreshToken, tokenUrl);

                if (data.accessToken) {
                    const decoded = jwtDecode(data.accessToken);

                    cookies.set('jwt-access-blog', data.accessToken, {
                        expires: new Date(decoded.exp * 1000),
                    });

                    accessToken = data.accessToken;
                }
            }

            if (accessToken) {
                const commentsUrl = url + "/comments";
                const data = await fetchComments(accessToken, commentsUrl);

                if (data.comments) {
                    setComments(data.comments);
                }
            }
        }
        checkComments();
  }, [])

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {post && 
        <Article>
            <header>
            <Title>{post.title}</Title>
            <PostDate>{format(post.createdAt, 'MMMM d, yyyy')}</PostDate>
            </header>
            <Main>
                <Sections sections={post.content.sections} />
                {comments && user &&
                    <CommentSection>
                        <h4>Comments</h4>
                        <Comments>
                            {
                                comments.map(comment => (
                                    <Comment key={comment.id}>
                                        <div>{comment.content.data}</div>
                                        <CommentDate>{format(comment.createdAt, 'MMM d, yyyy @ HH:mm')}</CommentDate>
                                        <div>{comment.author.username}</div>
                                    </Comment>
                                ))
                            }
                        </Comments>
                    </CommentSection>
                }
            </Main>
        </Article>
      }
    </>
  );
};

export default Post;
