import React, { useState, useEffect } from 'react'
import { Divider, Button, Space, Table, Tag, message } from 'antd'
import './FrontdeskPage.scss'
import CalendarComp from '../../components/Calendar/Calendar'
import FrontdeskCreate from './FrontdeskCreate'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../services/functionService'
import { guestsGetAction, resetMessagesAction } from '../../store/actions/bookingAction'
import Loading from '../../components/Loading/Loading'

const FrontdeskPage = () => {
	const [onCreateBooking, setOnCreateBooking] = useState(false)
	const [messageApi, contextHolder] = message.useMessage()
	const { guests, isLoading, success, error } = useSelector((state) => state.bookingStore)
	const [data, setData] = useState()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(guestsGetAction())
	}, [])
	useEffect(() => {
		loadData()
		// eslint-disable-next-line
	}, [onCreateBooking])
	const loadData = () => {
		// setCount();
		let tempData = []
		if (guests.length !== 0) {
			// eslint-disable-next-line
			guests.map((item, key) => {
				tempData.push({
					key: key,
					idGuest: item?.id_guest,
					statusGuest: item.status_guest,
					statusGuestRoom: item.status_guest_room,
					numberGuest: item?.number_guest,
					firstName: item?.first_name,
					lastName: item?.last_name,
					fatherName: item?.father_name,
					phoneNumber: item?.phone_number,
					email: item?.email,
					idBooking: item?.id_booking,
					arrivalDate: item?.arrival_date,
					departureDate: item?.departure_date,
					countAdults: item?.count_adults,
					countChildren: item?.count_children,
					amountPaid: item?.amount_paid,
					idRoom: item?.id_room,
					numberRoom: item?.room_number,
					roomFloor: item?.room_floor,
					idRoomStatus: item?.id_status,
					statusRoom: item?.status,
					colorSG: item.color_sg,
					colorSGR: item.color_sgr
				})
			})
			setData(tempData)
		}
	}

	React.useEffect(() => {
		if (!isEmpty(success)) {
			dispatch(resetMessagesAction())
			messageApi.open({
				type: 'success',
				content: success
			})
		}
	}, [error, success])
	const onCreateBookingClick = () => {
		setOnCreateBooking(true)
	}
	return (
		<>
			{contextHolder}
			{isLoading && <Loading />}
			{onCreateBooking ? (
				<FrontdeskCreate setOnCreateBooking={setOnCreateBooking} />
			) : (
				<>
					<h2>Оформление</h2>
					<div className='headerFrontdesk'>
						<div className='headerFrontdesk-tag'>
							<Divider orientation='left' orientationMargin='0'>
								Обозначения
							</Divider>
							<Space size={[0, 8]} wrap>
								<Tag color='orange' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Должен прибыть
								</Tag>
								<Tag color='red' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Должен выехать
								</Tag>
								<Tag color='green' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Прибыл
								</Tag>
								<Tag color='blue' style={{ fontSize: 16, padding: '0.5vh 1vh' }}>
									Выехал
								</Tag>
							</Space>
						</div>
						<div className='headerFrontdesk-create'>
							<Button type='primary' onClick={() => onCreateBookingClick()}>
								Оформить комнату
							</Button>
						</div>
					</div>
					<CalendarComp guests={data} />
				</>
			)}
		</>
	)
}

export default FrontdeskPage
