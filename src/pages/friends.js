import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


import styles from './friends.module.css';

const FriendList = [
    {
        "avatar": "https://avatars.githubusercontent.com/u/42486439",
        "link": "https://blog.stapxs.cn",
        "name": "Stapxs",
        "desc": "林槐"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2734825077&s=100",
        "link": "https://switefaster.github.io/",
        "name": "Sebrarin",
        "desc": "Switefaster"
    },
    {
        "avatar": "https://gravatar.loli.net/avatar/d9464e8ea970cefdfb729b7301d04232?s=100&d=mp",
        "link": "https://blog.zapic.moe/",
        "name": "Zapic",
        "desc": "中推顶流"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=754503921&s=100",
        "link": "https://izzel.io/",
        "name": "IzzelAliz",
        "desc": "海螺"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/8004211",
        "link": "https://blog.ustc-zzzz.net/",
        "name": "ustc-zzzz",
        "desc": "土球"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/32478104",
        "link": "https://github.com/KunoSayo",
        "name": "KunoSayo",
        "desc": "ljyys"
    },
    {
        "avatar": "https://blog.stapxs.cn/usr/uploads/2020/03/2635148446.jpg",
        "link": "https://doodlehuang.wordpress.com/",
        "name": "Doodle",
        "desc": "DoodleHuang"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/64351788",
        "link": "https://fullstack-sake.github.io/",
        "name": "sake",
        "desc": "冉冉"
    },
    {
        "avatar": "https://4ever-xxxl.github.io/img/avatar.jpg",
        "link": "https://4ever-xxxl.github.io/",
        "name": "xlykle",
        "desc": "磊子哥"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/36410093",
        "link": "https://xukafy.github.io/",
        "name": "XuKaFy",
        "desc": "X. F. K."
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2921349622&s=100",
        "link": "https://www.cnblogs.com/timlzh",
        "name": "Timlzh",
        "desc": "HiTlZm"
    },
    {
        "avatar": "https://malossov.github.io/uploads/avator.png",
        "link": "https://malossov.github.io/",
        "name": "Malossov",
        "desc": "书扬"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=1641064392&s=100",
        "link": "https://zbwer.github.io/",
        "name": "zbwer",
        "desc": "bwgg"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108183563",
        "link": "https://zzzremake.github.io/",
        "name": "remake",
        "desc": "ZzzRemake"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/61999173",
        "link": "https://blog.hareta.ren/",
        "name": "syrinka",
        "desc": "上行线路"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=463135821&s=100",
        "link": "https://codeforces.com/profile/lotato",
        "name": "lotato",
        "desc": "土豆，我的土豆"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/69978374?v=4",
        "link": "https://github.com/RisingEntropy",
        "name": "Entropy",
        "desc": "RisingEntropy"
    },
    {
        "avatar": "https://fattyray.github.io/fattyrays_homepage/profile.jpg",
        "link": "https://fattyray.github.io/fattyrays_homepage/",
        "name": "Sary",
        "desc": "fattyrays"
    },
]

function FriendCard({avatar, link, name, desc}) {
    return (
        <div className={clsx('col col--4', styles.cell)}>
            <div className={styles.card}>
                <a href={link}>
                    <div className={styles["frind-ship"]}>
                        <img src={avatar} height="100" width="100"/>
                        <div>
                            <h1>{name}</h1>
                            <em></em>
                            <p>{desc}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
      );
}

function AllFriends() {
    return (
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FriendList.map((props, idx) => (
                <FriendCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      );
}


export default function Friends() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title="Yaossg's Friends">
        <AllFriends />
      </Layout>
    );
  }
  