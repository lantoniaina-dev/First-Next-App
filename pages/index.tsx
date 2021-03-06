import type { NextPage } from 'next'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Affiche from './component/affiche'


interface Data {
  body: string,
  id: number,
  title: string,
  userId: 1
}

const Home: NextPage = ({ data, date }: any) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        ></link>
        {/* <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" /> */}
      </Head>

      <div className="home">
        <h2>{date}</h2>

        <div className="data">
          {
            data?.map((liste: Data, index: number) => {
              return (
                <div key={index} className="item alert ">
                  <Link href={"/blog2/" + liste.id}>
                    <a>
                      {liste.id} - {liste.body}
                    </a>
                  </Link>
                </div>)
            })
          }
        </div>
      </div>

      <div className='root-button'><Affiche /></div>
    </div>
  )
}

export let getStaticProps: GetStaticProps = async () => {
  let reponse = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=4`)
  let data = await reponse.json()
  return {
    props: {
      data,
      date: (new Date()).toString()
    },
    revalidate: 2,
  }
}
//revalidate: 2, Mettre a jour tous les 2 seconde les props lors du chargement de la page

export default Home
