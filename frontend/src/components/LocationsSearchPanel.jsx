import { MapPin } from 'lucide-react';

const LocationsSearchPanel = ({
	locationPickup,
	setSelectedLocation ,
	setLocationPickup ,
	setLocationDestination ,
	selectedLocation ,
	setRidesPanelOpened ,
	activeInput ,
	pickupSuggstions ,
	destinationSuggestions ,
	destinationRef
}) => {

    const locations = activeInput === 'pickup' ? pickupSuggstions : destinationSuggestions ;

	function handleClickLocation (location) {
		if ( activeInput === 'pickup' ) {
			setLocationPickup( location.trim() )
			destinationRef.current.focus()
			// document.getElementById("location-pickup").focus({focusVisible:true})
		} else {
			setLocationDestination( location.trim() )
		}
	}

	return (
		<div className='p-4 flex gap-4 flex-col' >
			{
				( activeInput !== null )
				&&
				locations.length > 0 
					? locations.map( function( location , no ) {
						return (
							<div key={`location-${no}`} onClick={()=>handleClickLocation(location)} className={`w-full p-2 px-3 flex gap-2 items-center justify-start border border-black/40 rounded-2xl ${selectedLocation===location && 'border'} `} >
								<div className="bg-[#eeeeee] text-gray-700 rounded-full p-1.5"><MapPin size={30} /></div>
								<h4 className="font-medium">{location.trim()}</h4>
							</div>
						)
					} )
					: (
						<div className="text-center"> No Suggestions </div>
					)
			}
		</div>
		)
	}

	export default LocationsSearchPanel