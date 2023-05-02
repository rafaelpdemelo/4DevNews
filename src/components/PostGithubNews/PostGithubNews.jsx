import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './../PostTabNews/PostTabNews.module.css';
import { GithubLogo, Tabs } from 'phosphor-react';
import axios from 'axios';

export function PostGithubNews() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.hackertab.dev/data/v2/github/global/daily.json?page=${page}`);
      setContents(prevContents => [...prevContents, ...response.data]);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const loadMore = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(loadMore, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <GithubLogo size={25} />
          <div className={styles.authorInfo}>
            <strong>GitHub News</strong>
            <span>Notícias e atualizações do GitHub para desenvolvedores.</span>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <h1>Último Conteúdos</h1>
        <div className={styles.scrollContainer}>
          {contents.map((item, index) => (
            <div key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
            </div>
          ))}
          <div ref={loader}>
            <h4>Carregando...</h4>
          </div>
        </div>
      </div>
    </article>
  );
}
