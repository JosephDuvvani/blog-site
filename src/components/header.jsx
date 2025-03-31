import { Link } from "react-router-dom";
import styled from "styled-components";

const Head = styled.header`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    max-width: 50rem;
    margin: auto;
    padding: 1rem;
`;

const Logo = styled.h1`
    display: block;
    width: fit-content;
    font-size: 1.5rem;
    font-weight: 500;
    color: #56bdbd;
    text-decoration: none;
    margin: 0;

    &:hover {
        text-decoration: underline;
    }
`;

const LogoLink = styled(Link)`
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Button = styled(Link)`
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    padding: .4rem .75rem;
    border-radius: 6px;
    color: inherit;
    border: 1px solid #56bdbd;

    &:hover {
        background-color:hsl(180, 43.80%, 83%);
    }
`;

const Login = styled(Button)`
    border: 1px solid;
`;

const Header = () => {
    return (
        <Head>
            <Logo>
                <LogoLink to={'/'}>TOP Blog</LogoLink>
            </Logo>
            <Buttons>
                <Login>Login</Login>
                <Button>Signup</Button>
            </Buttons>
        </Head>
    )
}

export default Header;