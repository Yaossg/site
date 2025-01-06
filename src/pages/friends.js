import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


import styles from './friends.module.css';

const FriendList = [
    {
        "avatar": "https://avatars.githubusercontent.com/u/8004211",
        "link": "https://blog.ustc-zzzz.net/",
        "name": "ustc-zzzz"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2734825077&s=640",
        "link": "https://switefaster.github.io/",
        "name": "Sebrarin"
    },
    {
        "avatar": "https://czz.ink/img/avatar.jpg",
        "link": "https://czz.ink/",
        "name": "Czz"
    },
    {
        "avatar": "https://45gfg9.net/static/img/avatar.png",
        "link": "https://45gfg9.net/",
        "name": "45gfg9"
    },
    {
        "avatar": "https://gravatar.loli.net/avatar/d9464e8ea970cefdfb729b7301d04232?s=100&d=mp",
        "link": "https://blog.zapic.moe/",
        "name": "Zapic"
    },
    {
        "avatar": "https://assets.doodlehuang.com/myface.png",
        "link": "",
        "name": "Doodle H."
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/25865657?v=4",
        "link": "https://my.minecraft.kim/",
        "name": "HikariLan"
    },
    {
        "avatar": "",
        "link": "",
        "name": ""
    },
    {
        "avatar": "",
        "link": "",
        "name": ""
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/78269445?v=4",
        "link": "https://mrcai.dev/",
        "name": "mrcaidev"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/61999173",
        "link": "https://blog.hareta.ren",
        "name": "syrinka"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/64351788",
        "link": "https://fullstack-sake.github.io/",
        "name": "fullstack-sake"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2921349622&s=640",
        "link": "https://timlzh.com/",
        "name": "Timlzh"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/49082837?v=4",
        "link": "https://blog.zbwer.work/",
        "name": "zbwer"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108183563",
        "link": "https://zzzremake.github.io/",
        "name": "ZzzRemake"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/57258888?v=4",
        "link": "https://ignotusjee.github.io/",
        "name": "IgnotusJee"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/101344459?v=4",
        "link": "https://songyu318.github.io/",
        "name": "SoCoco"
    },
    {
        "avatar": "http://www.sh1no.icu/avr.png",
        "link": "https://www.sh1no.icu/",
        "name": "Shino"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/106670529?v=4",
        "link": "",
        "name": "V. V. F."
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/36410093",
        "link": "",
        "name": "XuKaFy"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/88037744?v=4",
        "link": "https://4ever-xxxl.github.io/",
        "name": "xlykle"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=463135821&s=640",
        "link": "https://codeforces.com/profile/lotato",
        "name": "lotato"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/69978374?v=4",
        "link": "https://risingentropy.top/",
        "name": "R. Entropy"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2083953860&s=640",
        "link": "https://blog.csdn.net/weixin_44111457",
        "name": "lsr"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=3568921382&s=640",
        "link": "https://www.cnblogs.com/IrisHyaline",
        "name": "IrisHyaline"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/102424651?v=4",
        "link": "https://je3ter.github.io/",
        "name": "Je3ter"
    },
    {
        "avatar": "https://malossov.github.io/uploads/avator.png",
        "link": "https://malossov.github.io/",
        "name": "Malossov"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108604218?v=4",
        "link": "https://touhouxingchen.github.io/",
        "name": "X. C. C. Y."
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/61049305?v=4",
        "link": "https://blog.foxsuzuran.top/",
        "name": "FoxSuzuran"
    },
    {
        "avatar": "https://edwardssss.github.io/user/show_myself.png",
        "link": "https://edwardssss.github.io/",
        "name": "Edwardssss"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/86053421?v=4",
        "link": "https://ericzhang1412.github.io/",
        "name": "EricZhang"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/112836415?v=4",
        "link": "https://ganqiu.github.io/",
        "name": "Ganqiu"
    },
    {
        "avatar": "https://hurrison.com/images/avatar.jpg",
        "link": "https://hurrison.com/",
        "name": "Hurrison"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=799138673&s=640",
        "link": "https://deepunk.icu/",
        "name": "DeePunk"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/66125498?v=4",
        "link": "https://kreap-0.github.io/",
        "name": "Kreap"
    },
    {
        "avatar": "https://q.qlogo.cn/g?b=qq&nk=2802159741&s=640",
        "link": "https://wleukocytec.github.io/",
        "name": "Leukocyte"
    },
    {
        "avatar": "https://blog.wspdwzh.space/img/IMG_8952.JPG",
        "link": "https://blog.wspdwzh.space/",
        "name": "PeterTan"
    },
    {
        "avatar": "https://cdn.jsdelivr.net/gh/worchid39/image_host@main/blog_images/b_3188d41c83900168595b4b2d57916a6a.jpg",
        "link": "https://orch1d.icu",
        "name": "Orchid"
    },
    {
        "avatar": "",
        "link": "",
        "name": ""
    },
]

function FriendCard({avatar, link, name}) {
    return (
        <div className={clsx('col col--4', styles.cell)}>
            <div className={link ? styles.card : styles.card_shadow}>
                <a href={link ? link : undefined}>
                    <div className={styles["friend-ship"]}>
                        <img src={avatar ? avatar : "./img/no-avatar.svg"} height="100" width="100"/>
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
  