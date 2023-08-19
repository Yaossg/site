import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


import styles from './friends.module.css';

const FriendList = [
    {
        "avatar": "https://avatars.githubusercontent.com/u/42486439",
        "link": "https://blog.stapxs.cn",
        "name": "Stapxs"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2734825077&s=640",
        "link": "https://switefaster.github.io/",
        "name": "Sebrarin"
    },
    {
        "avatar": "https://gravatar.loli.net/avatar/d9464e8ea970cefdfb729b7301d04232?s=100&d=mp",
        "link": "https://blog.zapic.moe/",
        "name": "Zapic"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=754503921&s=640",
        "link": "https://izzel.io/",
        "name": "IzzelAliz"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/8004211",
        "link": "https://blog.ustc-zzzz.net/",
        "name": "ustc-zzzz"
    },
    {
        "avatar": "https://assets.doodlehuang.com/myface.png",
        "link": "https://doodlehuang.com/",
        "name": "Doodle H."
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/32266528?v=4",
        "link": "https://github.com/Zhengfourth",
        "name": "Zhengfourth"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/25865657?v=4",
        "link": "https://my.minecraft.kim/",
        "name": "HikariLan"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/32478104",
        "link": "https://github.com/KunoSayo",
        "name": "KunoSayo"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/64351788",
        "link": "https://fullstack-sake.github.io/",
        "name": "sake"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/88037744?v=4",
        "link": "https://4ever-xxxl.github.io/",
        "name": "xlykle"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/36410093",
        "link": "https://xukafy.github.io/",
        "name": "XuKaFy"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2921349622&s=640",
        "link": "https://www.cnblogs.com/timlzh",
        "name": "Timlzh"
    },
    {
        "avatar": "https://malossov.github.io/uploads/avator.png",
        "link": "https://malossov.github.io/",
        "name": "Malossov"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/49082837?v=4",
        "link": "https://zbwer.github.io/",
        "name": "zbwer"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108183563",
        "link": "https://zzzremake.github.io/",
        "name": "ZzzRemake"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/61999173",
        "link": "https://blog.hareta.ren",
        "name": "syrinka"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=463135821&s=640",
        "link": "https://codeforces.com/profile/lotato",
        "name": "lotato"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/69978374?v=4",
        "link": "https://github.com/RisingEntropy",
        "name": "R. Entropy"
    },
    {
        "avatar": "https://fattyray.github.io/fattyrays_homepage/profile.jpg",
        "link": "https://fattyray.github.io/fattyrays_homepage/",
        "name": "fattyrays"
    },
    {
        "avatar": "https://mrcai.dev/_astro/avatar.a5e28833.webp",
        "link": "https://mrcai.dev/",
        "name": "mrcaidev"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2624646185&s=640",
        "link": "https://focess.top/",
        "name": "sumijie"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/101344459?v=4",
        "link": "https://songyu318.github.io/",
        "name": "SoCoco"
    },
    {
        "avatar": "https://edwardssss.github.io/user/show_myself.png",
        "link": "https://edwardssss.github.io/",
        "name": "Edwardssss"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=3568921382&s=640",
        "link": "https://www.cnblogs.com/IrisHyaline",
        "name": "IrisHyaline"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2083953860&s=640",
        "link": "https://blog.csdn.net/weixin_44111457",
        "name": "lsr"
    },
    {
        "avatar": "http://www.sh1no.icu/avr.png",
        "link": "http://www.sh1no.icu/",
        "name": "Shino"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/102424651?v=4",
        "link": "https://je3ter.github.io/",
        "name": "Je3ter"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=185248912&s=640",
        "link": "https://www.riojasonc.com/",
        "name": "RioJasonC"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108604218?v=4",
        "link": "https://touhouxingchen.github.io/",
        "name": "X. C. C. Y."
    },
    {
        "avatar": "https://lostacnet.top/images/avatar.jpg",
        "link": "https://lostacnet.top/",
        "name": "LO_StacNet"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/86053421?v=4",
        "link": "https://ericzhang1412.github.io/",
        "name": "EricZhang"
    },
    {
        "avatar": "https://touhouxingchen.github.io/image/xfzn.png",
        "link": "https://dummywj.github.io/",
        "name": "Cherry_ywj"
    }, 
    {
        "avatar": "https://image.foxsuzuran.top/images/2023/04/14/QQ20230108024840.jpg",
        "link": "https://blog.foxsuzuran.top/",
        "name": "FoxSuzuran"
    }
]

function FriendCard({avatar, link, name}) {
    return (
        <div className={clsx('col col--4', styles.cell)}>
            <div className={styles.card}>
                <a href={link}>
                    <div className={styles["friend-ship"]}>
                        <img src={avatar} height="100" width="100"/>
                        <div>
                            <h1>{name}</h1>
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
  