import React from 'react'
import './loading.css'
export default function Loading() {
    return (
        <div class="modal fade show" style = {{opacity : 1}} id="loadMe" tabindex="-1" role="dialog" aria-labelledby="loadMeLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="loader"></div>
                        <div clas="loader-txt">
                            <p>Please wait...... <br /><br /><small>Your order is being confirmed</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
