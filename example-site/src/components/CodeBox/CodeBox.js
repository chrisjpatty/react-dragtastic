import React from 'react'
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import prism from 'react-syntax-highlighter/styles/prism/prism'

registerLanguage('jsx', jsx)

export default class CodeBox extends React.Component {
  render() {
    const { code } = this.props
    return (
      <SyntaxHighlighter language="jsx" style={prism} className="code">
        {code}
      </SyntaxHighlighter>
    )
  }
}
