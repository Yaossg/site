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
        "avatar": "https://i.zapic.moe/static/192.png",
        "link": "https://blog.zapic.moe/",
        "name": "Zapic"
    },
    {
        "avatar": "https://assets.doodlehuang.com/myface.png",
        "link": "",
        "name": "Doodle H."
    },
    {
        "avatar": "https://assets.hikarilan.life/avatar.png",
        "link": "https://hikarilan.life/",
        "name": "HikariLan"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=754503921&s=640",
        "link": "https://izzel.io/",
        "name": "IzzelAliz"
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
        "avatar": "https://blog.wspdwzh.space/img/IMG_8952.JPG",
        "link": "https://blog.wspdwzh.space/",
        "name": "PeterTan"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/57258888?v=4",
        "link": "https://ignotusjee.github.io/",
        "name": "IgnotusJee"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/64004730?v=4",
        "link": "https://mkfs.tech/",
        "name": "caozhanhao"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=799138673&s=640",
        "link": "https://deepunk.icu/",
        "name": "DeePunk"
    },
    {
        "avatar": "http://www.sh1no.icu/avr.png",
        "link": "https://www.sh1no.icu/",
        "name": "Shino"
    },
    {
        "avatar": "http://q1.qlogo.cn/g?b=qq&nk=2921349622&s=640",
        "link": "https://timlzh.com/",
        "name": "Timlzh"
    },
    {
        "avatar": "https://cdn.jsdelivr.net/gh/worchid39/image_host@main/blog_images/b_3188d41c83900168595b4b2d57916a6a.jpg",
        "link": "https://orch1d.icu",
        "name": "Orchid"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/101344459?v=4",
        "link": "https://songyu318.github.io/",
        "name": "SoCoco"
    },
    {
        "avatar": "https://cdn.jsdelivr.net/gh/EricZhang1412/PicGoStorage@master/img/url-JtiDxcHwQYlm1GTf.webp",
        "link": "https://www.ericzhuestc.site/",
        "name": "EricZhang"
    },
    {
        "avatar": "https://edwardssss.github.io/user/show_myself.png",
        "link": "https://edwardssss.github.io/",
        "name": "Edwardssss"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/108604218?v=4",
        "link": "https://touhouxingchen.fun/",
        "name": "X. C. C. Y."
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
        "avatar": "https://avatars.githubusercontent.com/u/61049305?v=4",
        "link": "https://blog.foxsuzuran.top/",
        "name": "FoxSuzuran"
    },
    {
        "avatar": "https://avatars.githubusercontent.com/u/112836415?v=4",
        "link": "https://ganqiu.github.io/",
        "name": "Ganqiu"
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
        "avatar": "",
        "link": "https://hurrison.com/",
        "name": "Hurrison"
    }
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
  