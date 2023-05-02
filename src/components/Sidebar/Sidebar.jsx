import styles from './../Sidebar/Sidebar.module.css';
import { PencilLine } from 'phosphor-react';

export function Sidebar(){
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" />
      
      <div className={styles.profile}>
        <img className={styles.avatar} src="https://github.com/rafaelpdemelo.png"/>
        <strong>Rafael Pereira</strong>
        <span>Software Engineer</span>
      </div>

      <footer>
      </footer>
    </aside>
  );
}