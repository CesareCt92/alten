import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BreweryList from './Card/BreweryList';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./style.css";
import Swal from 'sweetalert2'

const Layout = () => {
  const [breweriesData, setBreweriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
  const token = localStorage.getItem('loginToken');
  const expiryToken = localStorage.getItem('expiries');
  const idUser = localStorage.getItem('idUser');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {


    if (token) {
      const currentDateTime = new Date();
      const expiryDateTime = new Date(expiryToken);

      if (expiryDateTime > currentDateTime) {
        checkToken(token, expiryToken, timezone, idUser)

      } else {
        localStorage.removeItem('loginToken')
        localStorage.removeItem('expiries')
        localStorage.removeItem('idUser')
        navigate('/');
      }
    } else {
        localStorage.removeItem('loginToken')
        localStorage.removeItem('expiries')
        localStorage.removeItem('idUser')
      navigate('/');
    }
  }, []);

  const checkToken = async (token, expiryToken, timezone, idUser) => {
    try {

        const response = await fetch(`${API_BASE_URL}/checkToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ token, expiryToken, timezone, idUser }),
        });
        const responseData = await response.json()
        if (response.ok) {
            fetchBreweries(token, 1);
        } else {
            navigate('/');
            Swal.fire({
                title: 'Errore!',
                text: responseData.message,
                icon: 'info',
                confirmButtonColor: '#1e6dcb',
                confirmButtonText: 'Ok'
              })
        }

    } catch (error) {
        Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore',
            icon: 'info',
            confirmButtonColor: '#1e6dcb',
            confirmButtonText: 'Ok'
          })
    }
};

  const fetchBreweries = (token, page) => {
    fetch(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore',
            icon: 'info',
            confirmButtonColor: '#1e6dcb',
            confirmButtonText: 'Ok'
          })
        })
      .then(data => {
        setBreweriesData(prevData => [...prevData, ...data]);
        if (data.length === 0) {
          setHasMore(false);
        }
      })
      .catch(error => {
        Swal.fire({
            title: 'Errore!',
            text: 'Errore nell\'elaborazione dei dati',
            icon: 'info',
            confirmButtonColor: '#1e6dcb',
            confirmButtonText: 'Ok'
          })
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMoreData = () => {
    const token = localStorage.getItem('loginToken');
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      fetchBreweries(token, nextPage);
      return nextPage;
    });
  };

  return (
    <div className="layout-container">
      <Header />
      <InfiniteScroll
        dataLength={breweriesData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more breweries to load</p>}
      >
        <BreweryList breweries={breweriesData} />
      </InfiniteScroll>
      <Footer />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
