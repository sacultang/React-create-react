function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(
      <li key={t.id}>
        <a href={'/read/' + t.id}>{t.title}</a>
      </li>
    )
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  )
}
function Header(props) {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'js', body: 'js is ...' },
  ]
  return (
    <header className='App-header'>
      <h1>{props.title}</h1>
      <Nav topics={topics}></Nav>
      <Article title='Welcome' body='Hello , WEB'></Article>
      <Article title='Hi' body='Hello , WEB'></Article>
      <Article title='React' body='Hello , WEB'></Article>
    </header>
  )
}

export default Header
