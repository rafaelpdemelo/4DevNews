import { PostTabNews } from "./components/PostTabNews/PostTabNews";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";

import styles from './App.module.css';


import './global.css';
import { PostGithubNews } from "./components/PostGithubNews/PostGithubNews";


export function App(){
  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
          <Sidebar/>
        <main>
        <PostTabNews/>
        <PostGithubNews/>
        </main>
      </div>
    </div>
  )
}