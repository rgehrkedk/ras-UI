import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Mail, Globe, Clock, AlertTriangle, Info, Facebook, Instagram, Twitter } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const SocialIcon = ({ type }) => {
    switch (type) {
        case 'facebook':
            return <Facebook className="w-5 h-5 text-blue-600" />;
        case 'instagram':
            return <Instagram className="w-5 h-5 text-pink-600" />;
        case 'twitter':
            return <Twitter className="w-5 h-5 text-sky-500" />;
        default:
            return null;
    }
};

const AboutTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">About This Club</h3>
        <p className="text-slate-600 leading-relaxed">
            {club.description || "No description available."}
        </p>
    </div>
);

const LocationTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">Location</h3>
        <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
            <p className="text-slate-800 font-medium">{club.location.address}</p>
        </div>
        {club.location.latitude && club.location.longitude ? (
            <div className="h-80 w-full rounded-xl overflow-hidden shadow-inner border">
                 <MapContainer center={[club.location.latitude, club.location.longitude]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[club.location.latitude, club.location.longitude]}>
                        <Popup>{club.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        ) : (
            <div className="h-80 w-full rounded-xl bg-slate-100 flex items-center justify-center">
                <p className="text-slate-500">Map data not available.</p>
            </div>
        )}
    </div>
);

const ContactTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">Contact Information</h3>
        <div className="space-y-3">
            {club.contact_phone && (
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <a href={`tel:${club.contact_phone}`} className="text-slate-700 hover:text-teal-600">{club.contact_phone}</a>
                </div>
            )}
            {club.contact_email && (
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <a href={`mailto:${club.contact_email}`} className="text-slate-700 hover:text-teal-600">{club.contact_email}</a>
                </div>
            )}
            {club.homepage_url && (
                <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-teal-600" />
                    <a href={club.homepage_url} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-teal-600">Visit Website</a>
                </div>
            )}
        </div>
        {club.social_media && (
            <div className="mt-6">
                <h4 className="font-semibold text-slate-700 mb-3">Social Media</h4>
                <div className="flex items-center gap-4">
                    {Object.entries(club.social_media).map(([platform, url]) => (
                        url && (
                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                                <SocialIcon type={platform} />
                            </a>
                        )
                    ))}
                </div>
            </div>
        )}
    </div>
);

const AmenitiesTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">Amenities</h3>
        {club.amenities && club.amenities.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {club.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                        <span className="text-sm capitalize text-slate-700">{amenity.replace(/_/g, ' ')}</span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-slate-500">No amenities listed.</p>
        )}
    </div>
);

const HoursTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">Opening Hours</h3>
        <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-teal-600 mt-1" />
            <div className="space-y-2">
                {club.operating_hours?.weekday && (
                    <div>
                        <p className="font-semibold text-slate-700">Weekdays</p>
                        <p className="text-slate-600">{club.operating_hours.weekday}</p>
                    </div>
                )}
                {club.operating_hours?.weekend && (
                    <div>
                        <p className="font-semibold text-slate-700">Weekends</p>
                        <p className="text-slate-600">{club.operating_hours.weekend}</p>
                    </div>
                )}
            </div>
        </div>
        {club.operating_hours?.notes && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="text-yellow-800 text-sm">
                    <p className="font-semibold">Important Notice</p>
                    <p>{club.operating_hours.notes}</p>
                </div>
            </div>
        )}
    </div>
);

const OtherTab = ({ club }) => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">More Information</h3>
        {club.other_info ? (
            <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{club.other_info}</ReactMarkdown>
            </div>
        ) : (
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Info className="w-5 h-5 text-slate-500" />
                <p className="text-slate-600">No additional information provided.</p>
            </div>
        )}
    </div>
);

const TABS = {
    about: { label: "About", component: AboutTab },
    location: { label: "Location", component: LocationTab },
    contact: { label: "Contact", component: ContactTab },
    amenities: { label: "Amenities", component: AmenitiesTab },
    hours: { label: "Opening Hours", component: HoursTab },
    other: { label: "Other", component: OtherTab },
};

export default function ClubInfoTabs({ club }) {
    const [activeTab, setActiveTab] = React.useState("about");
    const ActiveComponent = TABS[activeTab].component;

    return (
        <Card className="border-0 shadow-lg w-full min-w-0">
            <CardHeader className="p-0 border-b">
                <div className="w-full min-w-0">
                    <div className="px-6 py-2 overflow-x-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                        <div className="flex gap-1 min-w-max">
                            {Object.entries(TABS).map(([key, { label }]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-4 py-3 font-semibold text-sm rounded-t-lg transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
                                        activeTab === key
                                            ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 w-full min-w-0">
                <ActiveComponent club={club} />
            </CardContent>
        </Card>
    );
}