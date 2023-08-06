import React from 'react'
import { Modal, Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import './ResultModal.scss'
import lossIcon from './../../../../assets/result-page/loss.png'
import winIcon from './../../../../assets/result-page/win.png'

interface ResultModalalProps {
  open: boolean
  onClose: () => void
  isBetWin: boolean
  potentialWin?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  greenBackground: { backgroundColor: 'rgba(0, 255, 45, 0.5)' },
  redBackground: { backgroundColor: 'rgba(0, 255, 45, 0.5)' },
  modalStyle: { borderRadius: '8px' },
  contentStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
}))

const ResultModal: React.FC<ResultModalalProps> = ({ open, onClose, isBetWin, potentialWin }) => {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className={classes.modalStyle}
      // style={{ backgroundColor: 'rgba(0, 255, 45, 0.5)' }}
      // className={isBetWin ? classes.greenBackground : classes.redBackground}
    >
      <Box className={classes.contentStyle}>
        {isBetWin ? (
          <div className='modal-content-win'>
            <div className='modal-header d-flex justify-content-center'>
              <img src={winIcon} alt='loss-icon' className='modal-content-win__icon' />
            </div>
            <div className='modal-body d-flex justify-content-center flex-column align-items-center'>
              <h3>Gratulacje!</h3>
              <p>Wygrałeś {potentialWin} BiedaCoinsów</p>
            </div>
          </div>
        ) : (
          <div className='modal-content-loss'>
            <div className='modal-header d-flex justify-content-center'>
              <img src={lossIcon} alt='loss-icon' className='modal-content-loss__icon' />
            </div>
            <div className='modal-body d-flex justify-content-center flex-column align-items-center'>
              <h3>Oooops!</h3>
              <p className='grey-color'>Niestety, Twój kupon okazał się przegranym</p>
              <p className='grey-color'>Spróbuj ponownie</p>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default ResultModal
