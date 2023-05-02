import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './../PostTabNews/PostTabNews.module.css';
import { GithubLogo, Tabs } from 'phosphor-react';
import axios from 'axios';

export function PostTabNews(){
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.tabnews.com.br/api/v1/contents?strategy=relevant&page=${page}&limit=10`);
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

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
        <Tabs size={25} />
          <div className={styles.authorInfo}>
            <strong>TabNews</strong>
            <span>Conteúdos para quem trabalha com Programação e Tecnologia.</span>
          </div>
        </div>

        <a className={styles.content} href="https://github.com/filipedeschamps/tabnews.com.br">
          <GithubLogo size={24}/></a>
      </header>
      <div className={styles.content}>
        <h1>Últimos Conteúdos </h1>
        <div className={styles.scrollContainer}>
          {contents.map((item, index) => (
            <div key={index}>
              <a href={item.source_url} target="_blank" rel="noopener noreferrer">
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