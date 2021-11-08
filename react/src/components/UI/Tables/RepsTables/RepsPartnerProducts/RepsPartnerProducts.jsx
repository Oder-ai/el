import React, {useContext} from 'react';
import {Context} from "../../../../../index";

const RepsPartnerProducts = () => {

    const {Reps} = useContext(Context);

    return (
        <table>
            <thead>
                <tr>
                    <td>

                    </td>
                    {Reps.reps_partner_sales.products_inmap(realization => {
                        <td>
                            realization.products_in_realization.map(product)
                        </td>
                    })}
                </tr>
            </thead>
        </table>
    );
};

export default RepsPartnerProducts;