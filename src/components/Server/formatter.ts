// @todo: Emojis - const emojiRegex = /:\w+:/g
export default class Parser {

  static url = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
  static img = /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g
  static mention = /{(.+?)}/g
  static rules: [RegExp, string][] = [
    [/</g, '&lt;'],                                                          // XSS
    [/>/g, '&gt;'],                                                          // XSS
    [/(\*\*|__)(.*?)\1/g, '<b>$2</b>'],                                      // Bold
    [/([*_])(.*?)\1/g, '<i>$2</i>'],                                         // Italic
    [/(~~)(.*?)\1/g, '<del>$2</del>'],                                       // Strikethrough
    [/(`{3}([a-z]+)\n)(.*?)(\n`{3})/g, '<code class="syntax-$2">$3</code>'], // Blockcode w/ syntax (coming soon)
    [/(`{3})\n?([^`]*)\1/g, '<code>$2</clode>'],                             // Blockcode
    [/(`)(.*?)\1/g, '<code class="simple">$2</code>'],                       // Code
    [Parser.mention, '<code class="mention">@$1</code>']                     // Mention
  ]

  static parseMarkdown (text: string): string {
    Parser.rules.forEach(rule => text = text.replace(rule[0], rule[1]))
    text = text.replace(/\\([*_~`])/g, '$1')
    return Parser.parseLinks(text)
  }

  static parseLinks (text: string): string {
    const urlsInText = text.match(this.url)
    if (urlsInText) {
      for (const URL of urlsInText) {
        text = text.replace(URL, `<a target="_blank" href="${URL}">${URL}</a>`)

        const imageMatch = URL.match(this.img)
        if (imageMatch) {
          text += `<br><img src="${imageMatch[0]}" class="embed"'>`
        }
      }
    }
    return text
  }

  static isMention (text: string, user: string): boolean {
    const exec = Parser.mention.exec(text)
    return exec && exec[1] === user
  }
}
