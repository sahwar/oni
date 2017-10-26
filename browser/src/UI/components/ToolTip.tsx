import * as React from "react"
import { connect } from "react-redux"

import * as State from "./../State"
import * as Colors from "./../Colors"

import { CursorPositioner } from "./CursorPositioner"

export interface IToolTipsViewProps {
    toolTips: State.IToolTip[]
    backgroundColor: string,
    foregroundColor: string,
}

export class ToolTipsView extends React.PureComponent<IToolTipsViewProps, void> {

    public render(): JSX.Element {

        const toolTipElements = this.props.toolTips.map((toolTip) => <ToolTipView {...toolTip} foregroundColor={this.props.foregroundColor} backgroundColor={this.props.backgroundColor} />)

        return <div className="tool-tips">
                {toolTipElements}
            </div>
    }
}

export interface IToolTipViewProps extends State.IToolTip { 
    backgroundColor: string
    foregroundColor: string
}

export class ToolTipView extends React.PureComponent<IToolTipViewProps, void> {

    public render(): JSX.Element {

        const options = this.props.options
        const position = options.position || null
        const openDirection = options.openDirection || 1

        const borderColorString = Colors.getBorderColor(this.props.backgroundColor, this.props.foregroundColor)

        const toolTipStyle: React.CSSProperties = {
            backgroundColor: this.props.backgroundColor,
            border: `1px solid ${borderColorString}`,
            color: this.props.foregroundColor,
            padding: "8px",
        }

        return <CursorPositioner position={position} openDirection={openDirection}>
                <div className="tool-tip-container" style={toolTipStyle}>
                    {this.props.element}
                </div>
                </CursorPositioner>
    }
}

const mapStateToProps = (state: State.IState): IToolTipsViewProps => {

    const toolTips = Object.keys(state.toolTips)
                        .map((toolTipId) => state.toolTips[toolTipId])
                        .filter((toolTipState) => toolTipState !== null)

    return {
        backgroundColor: state.backgroundColor,
        foregroundColor: state.foregroundColor,
        toolTips,
    }
}

export const ToolTips = connect(mapStateToProps)(ToolTipsView)