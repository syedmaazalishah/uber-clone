import { MapPin } from 'lucide-react';

const LocationsSearchPanel = ({ setSelectedLocation , selectedLocation , setRidesPanelOpened }) => {

    const locations = [
        'Near Islam Karyana Store , Umarabad Shaidu, Nowshehra.' ,
        'Near Azmat\'s Shop , Umarabad, Shaidu, Nowshehra.' ,
    ]

	return (
		<div className='p-4 flex gap-4 flex-col' >

			{
				locations.map( function( location , no ) {
					return (
						<div key={`location-${no}`} onClick={()=>{setSelectedLocation(location.trim());setRidesPanelOpened(true)}} className={`w-full p-2 px-3 flex gap-2 items-center justify-start border border-black/40 rounded-2xl ${selectedLocation===location && 'border'} `} >
							<div className="bg-[#eeeeee] text-gray-700 rounded-full p-1.5"><MapPin size={30} /></div>
							<h4 className="font-medium">{location.trim()}</h4>
						</div>
					)
				} )
			}
			

		</div>
	)
}

export default LocationsSearchPanel