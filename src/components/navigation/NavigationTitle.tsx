import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

export const NavigationTitle = () => {
  const location = useLocation();
  const { customerId } = useParams();

  const isCustomerRoute = location.pathname.includes('/customers/') && customerId && customerId !== 'undefined';
  const isTorqueWrenchRoute = location.pathname.includes('/torque-wrenches');
  const isTyreGaugeRoute = location.pathname.includes('/tyre-gauges');
  const isLiftingEquipmentRoute = location.pathname.includes('/lifting-equipment');

  const getTitle = () => {
    if (isLiftingEquipmentRoute) return "Lifting Equipment";
    if (isTyreGaugeRoute) return "Tyre Gauges";
    if (isTorqueWrenchRoute) return "Torque Wrenches";
    return "EquipTrack";
  };

  return (
    <Link to="/" className="text-xl font-semibold text-white">
      {getTitle()}
    </Link>
  );
};