/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { parseCookies, setCookie } from 'nookies';
import { useEffect, useState } from 'react';

export default function Home() {
  const cookies = parseCookies();
  const [ myCookies, setMyCookies ] = useState(cookies);
  useEffect(() => {
    let mounted = true;
    if(mounted) {
      console.log('to aqui')
    }
    return () => mounted = false;
  }, [myCookies]);


  const domainForCookie = (domain) => {
    const domainParts = String(domain).split('://')[1].split('/')[0].split(':')[0].split('.');
    const dividers = domainParts.length;
    const arrGlobalDomain = domainParts.slice(Math.max(dividers - (dividers - 1), 0));
    return arrGlobalDomain.join('.');
  } 

  const createCookie = () => {
    setCookie(undefined, 'cookie_custom_lax', 'content_custom_lax', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(window.location.href),
      sameSite: 'lax'
    });
    setCookie(undefined, 'cookie_custom_none', 'content_custom_none', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(window.location.href),
      sameSite: 'none'
    });
    setCookie(undefined, 'cookie_custom_strict', 'content_custom_strict', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(window.location.href),
      sameSite: 'strict'
    });
    setCookie(undefined, 'cookie_custom', 'content_custom', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(window.location.href)
    });



    setCookie(undefined, 'cookie_env_lax', 'content_env_lax', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(process.env.NEXT_PUBLIC_APP_URL),
      sameSite: 'lax'
    });
    setCookie(undefined, 'cookie_env_none', 'content_env_none', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(process.env.NEXT_PUBLIC_APP_URL),
      sameSite: 'none'
    });
    setCookie(undefined, 'cookie_env_strict', 'content_env_strict', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(process.env.NEXT_PUBLIC_APP_URL),
      sameSite: 'strict'
    });
    setCookie(undefined, 'cookie_env', 'content_env', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      domain: domainForCookie(process.env.NEXT_PUBLIC_APP_URL)
    });



    setCookie(undefined, 'cookie_default_lax', 'content_default_lax', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      sameSite: 'lax'
    });
    setCookie(undefined, 'cookie_default_none', 'content_default_none', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      sameSite: 'none'
    });
    setCookie(undefined, 'cookie_default_strict', 'content_default_strict', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
      sameSite: 'strict'
    });
    setCookie(undefined, 'cookie_default', 'content_default', {
      maxAge: 30 * 24 * 60 * 60, //30 days
      path: '/',
    });

    setMyCookies(parseCookies());
  }

  const removeCookies = () => {
    setCookie(undefined, 'cookie_custom_lax', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_custom_none', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_custom_strict', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_custom', '', { maxAge: -999999999, path:'/' });

    setCookie(undefined, 'cookie_env_lax', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_env_none', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_env_strict', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_env', '', { maxAge: -999999999, path:'/' });

    setCookie(undefined, 'cookie_default_lax', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_default_none', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_default_strict', '', { maxAge: -999999999, path:'/' });
    setCookie(undefined, 'cookie_default', '', { maxAge: -999999999, path:'/' });

    setMyCookies(parseCookies());
  }
  
  return (
    <>
      <Head>
        <title>Cookie test</title>
        <meta name="description" content="Project for cookie test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='main-content'>
          <div>
            {typeof window !== "undefined" && (
              <p>Custom: {domainForCookie(window.location.href)}</p>
            )}
            <p>ENV: {domainForCookie(process.env.NEXT_PUBLIC_APP_URL)}</p>
          </div>
          <hr style={{ width: 200 }} />
          {(myCookies && Object.keys(myCookies).length > 0) && (
            <>
              <div>
                <h4>Cookies criados:</h4>
                {Object.keys(myCookies).map((cookie, index) => (
                  <p key={`cookie${index}`}>{myCookies[cookie]}</p>
                ))}
              </div>
              <hr style={{ width: 200 }} />
            </>
          )}
          <button onClick={createCookie}>set cookies</button>
          <button onClick={removeCookies}>delete cookies</button>
        </div>
      </main>
    </>
  )
}
