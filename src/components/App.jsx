import { useState, useEffect } from 'react';
import { PixabayAPIService } from './helpers/pixabay-api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './LoadMoreButton/LoadMoreButton';
import { Grid } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import { Img } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [status, setStatus] = useState('idle');
  const [selectedImg, setSelectedImg] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = () => {
      setStatus('loading');
      PixabayAPIService(query, currentPage)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Error'));
        })
        .then(photos => {
          console.log('fetch');
          setPhotos(prev => [...prev, ...photos.hits]);
          setMaxPages(Math.ceil(photos.totalHits / 12));
          setStatus('fulfiled');
        });
    };

    fetchImages();
  }, [query, currentPage]);

  const updateCurrentPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setPhotos([]);
    setCurrentPage(1);
    setQuery(query);
  };

  const toggleModal = (img, tags) => {
    setModalShown(prev => !prev);
    setSelectedImg(img);
    setImgTags(tags);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      <ImageGallery photos={photos} onClick={toggleModal}></ImageGallery>
      {status === 'fulfiled' && currentPage <= maxPages && (
        <Button onClick={updateCurrentPage}></Button>
      )}
      {status === 'loading' && (
        <Grid
          visible={true}
          height="50"
          width="50"
          color="grey"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{
            display: 'block',
            textAlign: 'center',
          }}
          wrapperClass="grid-wrapper"
        />
      )}
      {modalShown && (
        <Modal onClose={toggleModal}>
          <Img src={selectedImg} alt={imgTags} />
        </Modal>
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     photos: [],
//     modalShown: false,
//     status: 'idle',
//     selectedImg: '',
//     imgTags: '',
//     maxPages: 0,
//     currentPage: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.query !== prevState.query) {
//       this.setState({ photos: [], status: 'loading' });
//       this.fetchImages();
//     }
//   }

//   fetchImages() {
//     PixabayAPIService(this.state.query, this.state.currentPage)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         return Promise.reject(new Error('Error'));
//       })
//       .then(photos => {
//         console.log(photos);
//         this.setState(prevState => {
//           const photosUpdated = [...prevState.photos, ...photos.hits];
//           const maxPages = Math.ceil(photos.totalHits / 12);
//           return {
//             photos: photosUpdated,
//             status: 'fulfiled',
//             maxPages,
//             currentPage: prevState.currentPage + 1,
//           };
//         });
//       });
//   }

//   handleSubmit = query => {
//     this.setState({ query });
//   };

//   handleClick = () => {
//     this.setState(prevState => ({
//       status: 'loading',
//     }));
//     this.fetchImages();
//   };

//   toggleModal = (img, tags) => {
//     this.setState(state => ({
//       modalShown: !this.state.modalShown,
//       selectedImg: img,
//       imgTags: tags,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <SearchBar onSubmit={this.handleSubmit}></SearchBar>
//         <ImageGallery
//           photos={this.state.photos}
//           onClick={this.toggleModal}
//         ></ImageGallery>
//         {this.state.status === 'fulfiled' &&
//           this.state.currentPage !== this.state.maxPages && (
//             <Button onClick={this.handleClick}></Button>
//           )}
//         {this.state.status === 'loading' && (
//           <Grid
//             visible={true}
//             height="50"
//             width="50"
//             color="grey"
//             ariaLabel="grid-loading"
//             radius="12.5"
//             wrapperStyle={{
//               display: 'block',
//               textAlign: 'center',
//             }}
//             wrapperClass="grid-wrapper"
//           />
//         )}
//         {this.state.modalShown && (
//           <Modal onClose={this.toggleModal}>
//             <Img src={this.state.selectedImg} alt={this.state.tags} />
//             {/* <ModalButton type="button" onClick={this.toggleModal}>
//               Close
//             </ModalButton> */}
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
