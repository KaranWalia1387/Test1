<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!--<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>-->
  <xsl:template match="/">
      <div class="col-lg-6 col-md-6">
        <div class="all_bill_box ">
          <h3>Power Bill</h3>
          <xsl:for-each select="Billing/PowerBill">
            <div class="white_div">
              <div class="left-area-tabular">Meter Number</div>
              <div class="right-area-tabular">
                <xsl:if test="MeterNumber">
                <xsl:value-of select="MeterNumber"/>
                </xsl:if>
              </div>
            </div>
           <div class="gray_div">
              <div class="left-area-tabular">Current Meter Reading</div>
              <div class="right-area-tabular">
                <xsl:if test="CurrentMeterReading">
                  <xsl:value-of select="CurrentMeterReading"/>
                </xsl:if>
              </div>
            </div>
           <div class="white_div">
              <div class="left-area-tabular">Prior Meter Reading</div>
              <div class="right-area-tabular">
                <xsl:if test="PriorMeterReading">
                  <xsl:value-of select="PriorMeterReading"/>
                </xsl:if>
              </div>
            </div>
            <div class="gray_div">
              <div class="left-area-tabular">Power Usage This Period</div>
              <div class="right-area-tabular">
                <xsl:if test="PowerUsageThisPeriod">
                  <xsl:value-of select="PowerUsageThisPeriod"/>
                </xsl:if>
              </div>
            </div>
       <div class="white_div">
              <div class="left-area-tabular">
                Total Power Charges
                <a id="powercalculation" href="#">
                  <img src="images/Question_Button.png"  data-toggle="modal" data-target=".bs-modal-sm" class="QuestionMark" />
                </a>   
              </div>
              <div class="right-area-tabular">
                <span>
                  <xsl:if test="TotalPowerCharges">
                    <xsl:value-of select="TotalPowerCharges"/>
                  </xsl:if>
                </span>
              </div>
            </div>
          </xsl:for-each>
        </div>
      </div>
      <xsl:for-each select="Billing/WaterBill">
        <div class="col-lg-6 col-md-6">
          <div class="all_bill_box ">
            <h3>Water Bill</h3>
            <div class="white_div">
              <div class="left-area-tabular">Total Usage</div>
              <div class="right-area-tabular">
                <xsl:if test="TotalUsage">
                  <xsl:value-of select="TotalUsage"/>
                </xsl:if>
              </div>
            </div>
            <div class="gray_div">
              <div class="left-area-tabular">
                Total Water Charges
                <a id="watercalculation" href="#">
                  <img src="images/Question_Button.png"  data-toggle="modal" data-target=".bf-modal-sm" class="QuestionMark" />
                </a>
              </div>
              <div class="right-area-tabular">
                <span>
                  <xsl:if test="TotalWaterCharges">
                    <xsl:value-of select="TotalWaterCharges"/>
                  </xsl:if>
                </span>
              </div>
            </div>
          </div>
        </div>
      </xsl:for-each>
    <xsl:for-each select="Billing/GasBill">
      <div class="col-lg-6 col-md-6">
        <div class="all_bill_box ">
          <h3>Gas Bill</h3>
          <div class="white_div">
            <div class="left-area-tabular">Total Gas Usage</div>
            <div class="right-area-tabular">
              <xsl:if test="TotalGasUsage">
                <xsl:value-of select="TotalGasUsage"/>
              </xsl:if>
            </div>
          </div>
          <div class="gray_div">
            <div class="left-area-tabular">Total Gas Charges</div>
            <div class="right-area-tabular">
              <span>
                <xsl:if test="TotalGasCharges">
                  <xsl:value-of select="TotalGasCharges"/>
                </xsl:if>
              </span>
            </div>
          </div>
        </div>
      </div>
    </xsl:for-each>
    
      <xsl:for-each select="Billing/SolidWasteBill">
      <div class="col-lg-6 col-md-6">
        <div class="all_bill_box ">
          <h3>Solid Waste Bill</h3>
          <div class="white_div">
            <div class="left-area-tabular">Solid Waste Tax</div>
              <div class="right-area-tabular">
                <xsl:if test="SolidWasteTax">
                  <xsl:if test="SolidWasteTax">
                    <xsl:value-of select="SolidWasteTax"/>
                  </xsl:if>
                </xsl:if>
              </div>
          </div>
          <div class="gray_div">
            <div class="left-area-tabular">Recycle Charges</div>
              <div class="right-area-tabular">
                <xsl:if test="RecycleCharges">
                  <xsl:value-of select="RecycleCharges"/>
                </xsl:if>
              </div>
          </div>

          <div class="white_div">
            <div class="left-area-tabular">Solid Resource Fee (Trash Fee)</div>
            <div class="right-area-tabular">
                <span>
                  <xsl:if test="SolidResourceFee">
                    <xsl:value-of select="SolidResourceFee"/>
                  </xsl:if>
                </span>
            </div>
          </div>
        </div>
      </div>
      </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
