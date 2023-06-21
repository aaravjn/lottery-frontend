import React from "react"

function Card({Title, DataValue, ImageSrc}) {
    return (
        <div
            style={{
                display: "inline-block",
                boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                backgroundColor:"white",
                width:"15em",
                height:"12em",
                padding:"1em",
                borderRadius:"1em"
            }}
        >
            <div className="row">
                <div
                    className="col-7"
                >
                    <p
                        style={{
                            color:"#696969",
                            fontSize:"15px"
                        }}
                    >{Title}</p>
                </div>
                <div
                    className="col-5"
                >
                    <img src={ImageSrc} alt="card-data" 
                        style={{
                            width:"4.5em",
                            height:"4.5em"
                        }}
                    />
                </div>
                <p
                    style={{
                        textAlign:"center",
                        marginTop:"0.5em",
                        fontSize:"2em",
                        fontWeight:"600"
                    }}
                >{DataValue}</p>
            </div>
        </div>
    )
}

export default Card;