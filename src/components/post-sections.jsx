import styled from "styled-components";

const Heading2 = styled.h2`
    font-size: 1.72rem;
    font-weight: 400;
    margin-block: 4rem 1rem;
    color: hsl(215, 27%, 15%);
`;

const Sections = ({sections}) => {
    return (
        <>
        {sections.map((section, i) => (
            <div key={i}>
            {section.heading && 
                <Heading2>{section.heading}</Heading2>
            }
            {section.content &&
                <>
                {section.content.map((data, i) => (
                    <div key={i}>
                    {Object.keys(data)[0] === 'text' &&
                        <p>{data.text}</p>
                    }
                    {Object.keys(data)[0] === 'list' && data.list.ordered &&
                        <ol>
                            {data.list.items.map((item, i) => (
                                <li key={i}>
                                    {item}
                                </li>
                            ))}
                        </ol>
                    }
                    {Object.keys(data)[0] === 'list' && !data.list.ordered &&
                        <ul>
                            {data.list.items.map((item, i) => (
                                <li key={i}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    }
                    </div>
                ))}
                </>
            }
            {}
            </div>
        ))}
        </>
    )
}

export default Sections;