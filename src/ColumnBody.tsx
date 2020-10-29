import { createStyles, Theme } from "@material-ui/core";
import withStyles, { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";

interface Props {
    classes: {[S in keyof ReturnType<typeof divStyle>]: string};
}

class _ColumnBody extends React.Component<Props>{


    render(){
        return(
            <div>
                <div style={{width: "100%", backgroundColor: "black", height: 200}}>
                    <img alt={"scatterbrain logo"} src={"../public/logo512.png"} width={512}/>
                </div>
                <div className={this.props.classes.column}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


const divStyle = (theme: Theme) => createStyles({
    column: {
        paddingLeft: "25%",
        paddingRight: "25%",
        height: "100%",
        width: "50%",
        backgroundImage: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,255),rgba(0,0,0,255),rgba(0,0,0,255), rgba(0,0,0,0))",
        display: "flex",
        flexDirection: "column"
    }
});

export const ColumnBody = withStyles(divStyle, {withTheme: true})(_ColumnBody);