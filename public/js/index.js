const { createApp } = Vue;
createApp({
    data() {
        const _d = new Date();
        const today = _d.getFullYear() + '-' + String(_d.getMonth()+1).padStart(2,'0') + '-' + String(_d.getDate()).padStart(2,'0');
        return {
            session: null,
            view: 'dashboard',
            portalView: 'select',
            custView: 'overview',
            sidebarOpen: false,
            showNotifs: false,
            showChat: false,
            newMessage: '',

            viewTitles: { dashboard: 'Dashboard', purchases: 'Purchases', sales: 'Sales Orders', inventory: 'Stock', expenses: 'Expenses', users: 'User Management', customers: 'Customers', payments: 'Payments', reports: 'Reports', financials: 'Financial', suppliers: 'Supplier Management' },

            customerTabs: [
                { key: 'overview', label: 'Overview', icon: 'fas fa-home' },
                { key: 'shop', label: 'Shop', icon: 'fas fa-store' },
                { key: 'orders', label: 'My Orders', icon: 'fas fa-box' },
                { key: 'transactions', label: 'Transactions', icon: 'fas fa-history' },
                { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
            ],

            // ---- Financial Data ----
            initialDeposit: 5000000,
            bankLedger: [
                { date: '2026-01-19', ref: 'SO001', customerName: 'Julius Berger', description: 'Bank payment — Dangote Cement (150 bags)', amount: 1275000, method: 'bank', bankName: 'Zenith Bank', runningBalance: 1275000 },
                { date: '2026-01-21', ref: 'SO002', customerName: 'Alhaji Gafar Ibrahim', description: 'Partial bank payment — 10mm Steel Rod', amount: 600000, method: 'bank', bankName: 'Touch Bank', runningBalance: 600000 },
                { date: '2026-01-12', ref: 'SO003', customerName: 'Walk-In Customer', description: 'Cash payment — Dangote Cement (50 bags)', amount: 425000, method: 'cash', bankName: '', runningBalance: 0 }
            ],

            // ---- Role Login ----
            roleLogin: { show: false, role: null, username: '', password: '', error: '' },

            // ---- Customer Login ----
            custLogin: {
                username: '', password: '', error: '',
                forgotMode: false, forgotStep: 1,
                forgotPhone: '', generatedCode: '', enteredCode: '', forgotError: '',
                foundCustomer: null, newPassword: '', confirmNewPassword: ''
            },

            // ---- Customer Registration ----
            custRegForm: { fullname: '', company: '', phone: '', email: '', address: '', state: '', username: '', password: '', confirmPassword: '', error: '', success: '' },

            // ---- Staff Users ----
            users: [
                { fullname: 'Administrator', username: 'admin123', password: '1234', role: 'Admin' },
                { fullname: 'Sales User', username: 'sale123', password: '1234', role: 'Sales' },
                { fullname: 'Store User', username: 'store123', password: '1234', role: 'Store' }
            ],

            // ---- Customers ----
            customers: [
                { customerId: 'CUST-' + 10001, fullname: 'Julius Berger', company: 'Julius Berger Nigeria', phone: '+234 801 234 5678', email: 'julius.b@jbn.com', address: '14 Berger Road, VI', state: 'Lagos', username: 'julius_b', password: 'pass123', type: 'regular', createdAt: '2026-01-05' },
                { customerId: 'CUST-' + 10002, fullname: 'Alhaji Gafar Ibrahim', company: '', phone: '+234 803 987 6543', email: 'gafar.i@mail.com', address: 'Kano Road, GRA', state: 'Kano', username: 'gafar_i', password: 'pass123', type: 'regular', createdAt: '2026-01-10' },
                { customerId: 'CUST-' + 10003, fullname: 'Walk-In Customer', company: '', phone: '+234 809 000 0001', email: '', address: 'N/A', state: 'Lagos', username: '', password: '', type: 'temporary', createdAt: '2026-01-12' }
            ],

            custTypeFilter: 'all',
            custSearch: '',

            // ---- Notifications ----
            notifs: [
                { title: 'Stock Alert', msg: '10mm Steel Rod is below 10 bundles!' },
                { title: 'Payment Received', msg: 'SO003 payment confirmed by Admin.' }
            ],

            messages: [
                { from: 'Musa Ibrahim', text: 'Truck for Cement arrived at gate.' },
                { from: 'Kemi Adebayo', text: 'Preparing quotation for Site C project.' }
            ],

            // ---- Products ----
            products: [
                { name: 'Dangote Cement (50kg)', category: 'Cement', stock: 450, unit: 'bags', price: 8500 },
                { name: '10mm Steel Rod', category: 'Rods', stock: 8, unit: 'bundles', price: 720000 },
                { name: 'River Sand (per ton)', category: 'Aggregates', stock: 65, unit: 'tons', price: 18000 },
                { name: 'Granite (3/4 inch)', category: 'Aggregates', stock: 120, unit: 'tons', price: 22000 },
                { name: 'Royal Tiles 60x60', category: 'Finishing', stock: 200, unit: 'sqm', price: 9500 }
            ],

            // ---- Multi-Bank System ----
            banks: [
                { name: 'Touch Bank', accountNumber: '0011223344', balance: 600000, openingBalance: 500000 },
                { name: 'Zenith Bank', accountNumber: '2200334455', balance: 1275000, openingBalance: 1000000 },
                { name: 'First Bank', accountNumber: '3012345678', balance: 0, openingBalance: 0 },
                { name: 'UBA Bank', accountNumber: '1012233445', balance: 0, openingBalance: 0 }
            ],

            // ---- Initial Cash / Drawer ----
            initialCash: 2000000,
            showCashSetup: false,
            newInitialCash: 0,
            editingOpeningBalance: false,
            tempOpeningBalance: 0,
            selectedBank: null,

            // ---- Suppliers ----
            suppliers: [
                { id: 'SUP-001', name: 'Dangote Industries', contact: 'Musa Aliyu', phone: '+234 800 111 2222', email: 'supply@dangote.com', address: 'Lagos', type: 'permanent', category: 'Cement', notes: 'Main cement supplier', createdAt: '2026-01-01' },
                { id: 'SUP-002', name: 'Aliko Steel Ltd', contact: 'Bello Sani', phone: '+234 803 444 5555', email: 'info@alikosteel.com', address: 'Kano', type: 'permanent', category: 'Rods', notes: 'Steel rod supplier', createdAt: '2026-01-05' }
            ],
            supplierModal: { show: false, isEdit: false, editId: null, name: '', contact: '', phone: '', email: '', address: '', type: 'permanent', category: '', notes: '', error: '' },
            supplierFilters: { search: '', type: '' },

            // ---- Purchases ----
            purchases: [
                { id: 'PO001', items: [{ name: 'Dangote Cement (50kg)', qty: 500, price: 7500 }], amount: 3750000, source: 'Touch Bank', date: '2026-02-15', status: 'arrived' },
                { id: 'PO002', items: [{ name: '10mm Steel Rod', qty: 50, price: 650000 }], amount: 32500000, source: 'Zenith Bank', date: '2026-02-18', status: 'pending' },
                { id: 'PO003', items: [{ name: 'River Sand (per ton)', qty: 100, price: 16000 }], amount: 1600000, source: 'Cash Drawer', date: '2026-02-19', status: 'pending' }
            ],
            purchaseFilters: { search: '', dateFrom: '', dateTo: '' },
            showAllActivities: false,

            // ---- Orders ----
            orders: [
                { id: 'SO001', customer: 'Julius Berger Nigeria (Julius Berger) — CUST-10001', customerName: 'Julius Berger (Julius Berger Nigeria)', customerId: 'CUST-10001', items: [{ name: 'Dangote Cement (50kg)', qty: 150, amount: 1275000 }], total: 1275000, amountPaid: 1275000, status: 'confirmed', paymentStatus: 'paid', paymentRef: 'SO001-PAY', paymentMethod: 'bank', bankName: 'Zenith Bank', paymentDate: '2026-02-12', created_at: '2026-02-10' },
                { id: 'SO002', customer: 'Alhaji Gafar Ibrahim — CUST-10002', customerName: 'Alhaji Gafar Ibrahim', customerId: 'CUST-10002', items: [{ name: '10mm Steel Rod', qty: 2, amount: 1440000 }], total: 1440000, amountPaid: 600000, status: 'quotation', paymentStatus: 'partial', paymentRef: 'SO002-TRF', paymentMethod: 'bank', bankName: 'Touch Bank', paymentDate: '2026-02-15', created_at: '2026-02-14' },
                { id: 'SO003', customer: 'Walk-In Customer (Walk-in) — WALK-10003', customerName: 'Walk-In Customer', customerId: 'WALK-10003', items: [{ name: 'Dangote Cement (50kg)', qty: 50, amount: 425000 }], total: 425000, amountPaid: 425000, status: 'delivered', paymentStatus: 'paid', paymentRef: 'SO003-CASH', paymentMethod: 'cash', bankName: '', paymentDate: '2026-02-05', created_at: '2026-02-05' },
                { id: 'SO004', customer: 'Julius Berger Nigeria (Julius Berger) — CUST-10001', customerName: 'Julius Berger (Julius Berger Nigeria)', customerId: 'CUST-10001', items: [{ name: 'River Sand (per ton)', qty: 20, amount: 360000 }], total: 360000, amountPaid: 0, status: 'quotation', paymentStatus: 'unpaid', paymentRef: '', paymentMethod: '', bankName: '', paymentDate: '', created_at: '2026-02-18' }
            ],

            // ---- Expenses ----
            expenses: [
                { date: '2026-02-08', category: 'Transport', description: 'Fuel for delivery trucks', amount: 45000 },
                { date: '2026-02-12', category: 'Utilities', description: 'Electricity bill for warehouse', amount: 28000 },
                { date: '2026-02-17', category: 'Salaries', description: 'Staff salaries for February', amount: 350000 }
            ],

            // ---- Customer Transactions ----
            transactions: [
                { id: 'TXN001', customerId: 'CUST-10001', ref: 'SO001', description: 'Payment for Dangote Cement (150 bags)', amount: 1275000, date: '2026-02-12', type: 'payment', method: 'bank', bankName: 'Zenith Bank', outstanding: 0 },
                { id: 'TXN002', customerId: 'WALK-10003', ref: 'SO003', description: 'Cash payment for Dangote Cement (50 bags)', amount: 425000, date: '2026-02-05', type: 'payment', method: 'cash', bankName: '', outstanding: 0 },
                { id: 'TXN003', customerId: 'CUST-10002', ref: 'SO002', description: 'Partial payment for 10mm Steel Rod', amount: 600000, date: '2026-02-15', type: 'payment', method: 'bank', bankName: 'Touch Bank', outstanding: 840000 }
            ],

            // ---- Filters ----
            paymentFilter: { status: '', method: '', bank: '', dateFrom: '', dateTo: '' },
            custOrderFilter: { status: '', payMethod: '', payStatus: '', dateFrom: '', dateTo: '', sort: 'date_new' },
            txnFilter: { method: '', dateFrom: '', dateTo: '' },
            inventoryFilters: { search: '', category: '', stockLevel: '', sortBy: 'name' },
            salesFilters: { search: '', sortBy: 'date_new' },
            expenseFilters: { search: '', category: '', sortBy: 'date_new' },

            // ---- Modals ----
            modal: { show: false, isEdit: false, activeIndex: null, userError: '' },
            paymentModal: { show: false, order: null, mode: 'bank', selectedBank: '', bankAmount: 0, cashAmount: 0, reference: '' },
            staffPayModal: { show: false, order: null, mode: 'bank', selectedBank: '', bankAmount: 0, cashAmount: 0, reference: '' },
            purchaseModal: { show: false, supplier: '', supplierCustom: '', date: '', lines: [{ name: '', customName: '', qty: 1, unitCost: 0, amount: 0 }], bankRows: [{ bankName: '', amount: 0 }], useCash: false, cashAmount: 0, reference: '', error: '' },
            custOrderModal: { show: false, cartLines: [{ name: '', qty: 1, unitPrice: 0, amount: 0 }], type: 'quotation' },
            customerHistoryModal: { show: false, customer: null, orders: [], totalPurchases: 0, totalPaid: 0, outstanding: 0, histFilter: { status: '', dateFrom: '', dateTo: '', sort: 'date_new' } },
            generalHistoryModal: { show: false, search: '', status: '', dateFrom: '', dateTo: '', customer: '', sort: 'date_new' },
            deliveryMenu: { orderId: null },
            partialDeliveryModal: { show: false, order: null, lines: [], error: '' },

            // ---- Forms ----
            form: {
                customer: '', status: 'quotation',
                orderLines: [{ name: '', qty: 1, unitPrice: 0, amount: 0 }],
                // customer select for sales orders
                custSelectType: 'regular',
                selectedCustomer: null,
                custSearchQuery: '',
                custSearchOpen: false,
                walkinName: '',
                walkinPhone: '',
                pName: '', stock: 0, price: 0,
                uFullname: '', uUsername: '', uPassword: '', uRole: 'Sales',
                expCategory: '', expDescription: '', expAmount: 0, expDate: today,
                custType: 'regular', custFullname: '', custCompany: '', custPhone: '', custEmail: '', custAddress: '', custState: '', custUsername: '', custPassword: ''
            },

            // ---- Reports ----
            report: { product: '__all__', method: '__all__', date_from: '', date_to: '' },
            reportResults: { items: [], totalQty: 0, totalAmount: 0, bankAmount: 0, cashAmount: 0, outstanding: 0 },
            expenseReport: { category: '__all__', date_from: '', date_to: '' },
            expenseReportResults: { items: [], total: 0 },

            nigerianStates: ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT (Abuja)','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara']
        };
    },

    computed: {
        // ---- Financial Computations ----
        // Multi-bank balances computed from ledger
        bankBalances() {
            const balances = {};
            this.banks.forEach(b => balances[b.name] = (b.openingBalance || 0));
            this.bankLedger.forEach(entry => {
                if (entry.method === 'bank' && entry.bankName && balances.hasOwnProperty(entry.bankName)) {
                    balances[entry.bankName] += entry.amount;
                }
            });
            return balances;
        },
        totalBankBalance() {
            return Object.values(this.bankBalances).reduce((s, v) => s + v, 0);
        },
        cashReceived() {
            return this.bankLedger.filter(e => e.method === 'cash').reduce((s, e) => s + e.amount, 0);
        },
        drawerBalance() {
            return this.initialCash + this.cashReceived;
        },
        bankBalance() {
            // Legacy computed kept for compatibility
            return this.totalBankBalance;
        },
        totalOutstandingDebts() {
            return this.orders.reduce((s, o) => s + Math.max(0, o.total - (o.amountPaid||0)), 0);
        },
        debtorCount() {
            const debtors = new Set(this.orders.filter(o => (o.total - (o.amountPaid||0)) > 0).map(o => o.customerId));
            return debtors.size;
        },
        partialPaymentCount() {
            return this.orders.filter(o => (o.amountPaid||0) > 0 && (o.total - (o.amountPaid||0)) > 0).length;
        },
        customerDebtList() {
            const map = {};
            this.orders.forEach(o => {
                if (!map[o.customerId]) {
                    const cust = this.customers.find(c => c.customerId === o.customerId);
                    map[o.customerId] = { customerId: o.customerId, name: o.customerName || o.customer, company: cust?.company || '', totalPurchases: 0, totalPaid: 0, outstanding: 0 };
                }
                map[o.customerId].totalPurchases += o.total;
                map[o.customerId].totalPaid += (o.amountPaid||0);
                map[o.customerId].outstanding += Math.max(0, o.total - (o.amountPaid||0));
            });
            return Object.values(map).filter(c => c.outstanding > 0).sort((a,b) => b.outstanding - a.outstanding);
        },
        totalBankPayments() {
            return this.bankLedger.filter(e => e.method === 'bank').reduce((s, e) => s + e.amount, 0);
        },
        totalCashPayments() { return this.cashReceived; },
        stockValue() {
            return this.products.reduce((s, p) => s + (p.stock * p.price), 0);
        },
        totalExpenses() {
            return this.expenses.reduce((s, e) => s + e.amount, 0);
        },
        totalAssets() {
            const pendingPurchasesValue = this.purchases.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
            return this.totalBankBalance + this.drawerBalance + this.stockValue + pendingPurchasesValue - this.totalExpenses;
        },
        todayExpenses() {
            const today = this.localDateStr();
            return this.expenses.filter(e => e.date === today).reduce((s, e) => s + e.amount, 0);
        },
        lowStockProducts() {
            return this.products.filter(p => p.stock < 20);
        },
        todaySales() {
            const today = this.localDateStr();
            return this.orders.filter(o => o.created_at === today && o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0);
        },

        // ---- Payment Computations ----
        confirmedPaymentsTotal() { return this.orders.filter(o => (o.amountPaid||0) > 0).reduce((s, o) => s + (o.amountPaid||0), 0); },
        confirmedPaymentsCount() { return this.orders.filter(o => o.paymentStatus === 'paid' && (o.total-(o.amountPaid||0))<=0).length; },
        pendingPaymentsCount() { return this.orders.filter(o => o.paymentStatus === 'pending_confirmation').length; },

        filteredPayments() {
            return this.orders.filter(o => {
                if (this.paymentFilter.status && o.paymentStatus !== this.paymentFilter.status) return false;
                if (this.paymentFilter.method && o.paymentMethod !== this.paymentFilter.method) return false;
                if (this.paymentFilter.bank && o.bankName !== this.paymentFilter.bank) return false;
                const oDate = (o.created_at||'').slice(0,10);
                if (this.paymentFilter.dateFrom && oDate < this.paymentFilter.dateFrom.slice(0,10)) return false;
                if (this.paymentFilter.dateTo && oDate > this.paymentFilter.dateTo.slice(0,10)) return false;
                return true;
            }).slice().sort((a,b) => new Date(b.paymentDate||b.created_at) - new Date(a.paymentDate||a.created_at));
        },

        // ---- Customer Computations ----
        filteredCustomers() {
            return this.customers.filter(c => {
                if (this.custTypeFilter !== 'all' && c.type !== this.custTypeFilter) return false;
                if (this.custSearch) {
                    const q = this.custSearch.toLowerCase();
                    return c.fullname.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.includes(q) || c.customerId?.includes(q);
                }
                return true;
            });
        },

        // ---- Customer Portal Computations ----
        myOrders() {
            if (!this.session || this.session.role !== 'Customer') return [];
            return this.orders.filter(o => o.customerId === this.session.customerId);
        },
        myPaidOrders() { return this.myOrders.filter(o => o.paymentStatus === 'paid' && (o.total-(o.amountPaid||0))<=0); },
        myTotalSpent() { return this.myOrders.reduce((s, o) => s + (o.amountPaid||0), 0); },
        myOutstandingDebt() { return this.myOrders.reduce((s, o) => s + Math.max(0, o.total - (o.amountPaid||0)), 0); },
        myTransactions() {
            if (!this.session) return [];
            return this.transactions.filter(t => t.customerId === this.session.customerId);
        },
        filteredMyOrders() {
            let result = this.myOrders.filter(o => {
                if (this.custOrderFilter.status && o.status !== this.custOrderFilter.status) return false;
                if (this.custOrderFilter.payStatus && o.paymentStatus !== this.custOrderFilter.payStatus) return false;
                if (this.custOrderFilter.payMethod && o.paymentMethod !== this.custOrderFilter.payMethod) return false;
                const d = parseInt((o.created_at||'').slice(0,10).replace(/-/g,''));
                const df = this.custOrderFilter.dateFrom ? parseInt(this.custOrderFilter.dateFrom.replace(/-/g,'')) : null;
                const dt = this.custOrderFilter.dateTo ? parseInt(this.custOrderFilter.dateTo.replace(/-/g,'')) : null;
                if (df && d < df) return false;
                if (dt && d > dt) return false;
                return true;
            });
            const s = this.custOrderFilter.sort;
            if (s === 'date_new') result.sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)));
            else if (s === 'date_old') result.sort((a,b) => String(a.created_at).localeCompare(String(b.created_at)));
            else if (s === 'amount_high') result.sort((a,b) => b.total-a.total);
            else if (s === 'amount_low') result.sort((a,b) => a.total-b.total);
            return result;
        },
        filteredMyTransactions() {
            return this.myTransactions.filter(t => {
                if (this.txnFilter.method && t.method !== this.txnFilter.method) return false;
                const d = parseInt((t.date||'').slice(0,10).replace(/-/g,''));
                const df = this.txnFilter.dateFrom ? parseInt(this.txnFilter.dateFrom.replace(/-/g,'')) : null;
                const dt = this.txnFilter.dateTo ? parseInt(this.txnFilter.dateTo.replace(/-/g,'')) : null;
                if (df && d < df) return false;
                if (dt && d > dt) return false;
                return true;
            }).slice().sort((a,b) => String(b.date).localeCompare(String(a.date)));
        },

        // ---- Order Builder Totals ----
        orderLinesTotal() {
            if (!this.form.orderLines) return 0;
            return this.form.orderLines.reduce((s, l) => s + (l.amount || 0), 0);
        },
        custCartTotal() {
            if (!this.custOrderModal.cartLines) return 0;
            return this.custOrderModal.cartLines.reduce((s, l) => s + (l.amount || 0), 0);
        },

        // ---- Customer Search (in Sales Order form) ----
        filteredCustSearch() {
            const q = (this.form.custSearchQuery || '').toLowerCase().trim();
            if (!q) return [];
            return this.customers.filter(c => {
                return (
                    c.fullname.toLowerCase().includes(q) ||
                    (c.company || '').toLowerCase().includes(q) ||
                    (c.customerId || '').toLowerCase().includes(q) ||
                    (c.phone || '').includes(q) ||
                    (c.email || '').toLowerCase().includes(q)
                );
            }).slice(0, 8); // limit to 8 results
        },

        // ---- Inventory Filters & Sort ----
        uniqueCategories() {
            return [...new Set(this.products.map(p => p.category))];
        },
        filteredInventory() {
            let result = this.products.slice();
            // Search
            if (this.inventoryFilters.search) {
                const q = this.inventoryFilters.search.toLowerCase();
                result = result.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                );
            }
            // Category filter
            if (this.inventoryFilters.category) {
                result = result.filter(p => p.category === this.inventoryFilters.category);
            }
            // Stock level filter
            if (this.inventoryFilters.stockLevel === 'low') {
                result = result.filter(p => p.stock < 20);
            } else if (this.inventoryFilters.stockLevel === 'normal') {
                result = result.filter(p => p.stock >= 20);
            }
            // Sort
            if (this.inventoryFilters.sortBy === 'name') {
                result.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.inventoryFilters.sortBy === 'name_desc') {
                result.sort((a, b) => b.name.localeCompare(a.name));
            } else if (this.inventoryFilters.sortBy === 'stock_low') {
                result.sort((a, b) => a.stock - b.stock);
            } else if (this.inventoryFilters.sortBy === 'stock_high') {
                result.sort((a, b) => b.stock - a.stock);
            } else if (this.inventoryFilters.sortBy === 'price_low') {
                result.sort((a, b) => a.price - b.price);
            } else if (this.inventoryFilters.sortBy === 'price_high') {
                result.sort((a, b) => b.price - a.price);
            }
            return result;
        },

        // ---- Purchases Filters & Sort ----
        // All suppliers = manually added suppliers + permanent customers auto-reflected as temporary suppliers
        allSuppliersWithCustomers() {
            // Start with manually created suppliers
            const list = this.suppliers.map(s => ({ ...s, _source: 'supplier' }));
            // Add permanent customers not already in the suppliers list (by name match)
            const supplierNames = new Set(this.suppliers.map(s => s.name.toLowerCase()));
            const permanentCustomers = this.customers.filter(c => c.type !== 'temporary');
            permanentCustomers.forEach(c => {
                const displayName = c.company ? c.company + ' (' + c.fullname + ')' : c.fullname;
                if (!supplierNames.has(displayName.toLowerCase()) && !supplierNames.has(c.fullname.toLowerCase())) {
                    list.push({
                        id: 'CUST-SUP-' + c.customerId,
                        name: displayName,
                        contact: c.fullname,
                        phone: c.phone || '',
                        email: c.email || '',
                        address: (c.address ? c.address + ', ' : '') + (c.state || ''),
                        type: 'temporary',
                        category: '',
                        notes: 'Auto-linked from customer: ' + c.customerId,
                        createdAt: c.createdAt,
                        _source: 'customer',
                        _customerId: c.customerId
                    });
                }
            });
            return list;
        },
        filteredSuppliers() {
            let result = this.allSuppliersWithCustomers.slice();
            if (this.supplierFilters.search) {
                const q = this.supplierFilters.search.toLowerCase();
                result = result.filter(s => s.name.toLowerCase().includes(q) || (s.contact||'').toLowerCase().includes(q) || (s.category||'').toLowerCase().includes(q));
            }
            if (this.supplierFilters.type) result = result.filter(s => s.type === this.supplierFilters.type);
            return result;
        },
        filteredPurchases() {
            let result = this.purchases.slice();
            if (this.purchaseFilters.search) {
                const q = this.purchaseFilters.search.toLowerCase();
                result = result.filter(p =>
                    p.id.toLowerCase().includes(q) ||
                    p.source.toLowerCase().includes(q) ||
                    p.items.some(i => i.name.toLowerCase().includes(q))
                );
            }
            const dateFrom = this.purchaseFilters.dateFrom ? parseInt(this.purchaseFilters.dateFrom.replace(/-/g,'')) : null;
            const dateTo = this.purchaseFilters.dateTo ? parseInt(this.purchaseFilters.dateTo.replace(/-/g,'')) : null;
            result = result.filter(p => {
                const pDate = parseInt(String(p.date || '').slice(0,10).replace(/-/g,''));
                if (dateFrom && pDate < dateFrom) return false;
                if (dateTo && pDate > dateTo) return false;
                return true;
            });
            return result.sort((a, b) => String(b.date).localeCompare(String(a.date)));
        },
        recentActivities() {
            const activities = [];
            this.transactions.forEach(t => {
                activities.push({
                    date: t.date,
                    title: 'Payment: ' + t.ref,
                    description: t.description,
                    amount: t.amount,
                    type: 'credit'
                });
            });
            this.expenses.forEach(e => {
                activities.push({
                    date: e.date,
                    title: 'Expense: ' + e.category,
                    description: e.description,
                    amount: e.amount,
                    type: 'debit'
                });
            });
            return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        // ---- Sales Orders Filters & Sort ----
        filteredSalesOrders() {
            let result = this.orders.slice();
            // Search
            if (this.salesFilters.search) {
                const q = this.salesFilters.search.toLowerCase();
                result = result.filter(o =>
                    o.id.toLowerCase().includes(q) ||
                    (o.customerName || o.customer || '').toLowerCase().includes(q) ||
                    (o.customerId || '').toLowerCase().includes(q)
                );
            }
            // Sort
            if (this.salesFilters.sortBy === 'date_new') {
                result.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
            } else if (this.salesFilters.sortBy === 'date_old') {
                result.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
            } else if (this.salesFilters.sortBy === 'amount_high') {
                result.sort((a, b) => b.total - a.total);
            } else if (this.salesFilters.sortBy === 'amount_low') {
                result.sort((a, b) => a.total - b.total);
            } else if (this.salesFilters.sortBy === 'customer') {
                result.sort((a, b) => (a.customerName || a.customer).localeCompare(b.customerName || b.customer));
            }
            return result;
        },

        // ---- Customer History Modal Filter ----
        filteredHistoryOrders() {
            const f = this.customerHistoryModal.histFilter;
            let result = (this.customerHistoryModal.orders || []).slice();
            if (f.status) result = result.filter(o => o.paymentStatus === f.status);
            if (f.dateFrom) {
                const df = parseInt(f.dateFrom.replace(/-/g,''));
                result = result.filter(o => parseInt((o.created_at||'').slice(0,10).replace(/-/g,'')) >= df);
            }
            if (f.dateTo) {
                const dt = parseInt(f.dateTo.replace(/-/g,''));
                result = result.filter(o => parseInt((o.created_at||'').slice(0,10).replace(/-/g,'')) <= dt);
            }
            if (f.sort === 'date_new') result.sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)));
            else if (f.sort === 'date_old') result.sort((a,b) => String(a.created_at).localeCompare(String(b.created_at)));
            else if (f.sort === 'amount_high') result.sort((a,b) => b.total-a.total);
            else if (f.sort === 'amount_low') result.sort((a,b) => a.total-b.total);
            return result;
        },
        filteredGeneralHistory() {
            const f = this.generalHistoryModal;
            let result = this.orders.slice();
            if (f.search) {
                const q = f.search.toLowerCase();
                result = result.filter(o => o.id.toLowerCase().includes(q) || (o.customerName||o.customer||'').toLowerCase().includes(q) || (o.customerId||'').toLowerCase().includes(q));
            }
            if (f.customer) result = result.filter(o => o.customerId === f.customer);
            if (f.status) result = result.filter(o => o.paymentStatus === f.status);
            if (f.dateFrom) {
                const df = parseInt(f.dateFrom.replace(/-/g,''));
                result = result.filter(o => parseInt((o.created_at||'').slice(0,10).replace(/-/g,'')) >= df);
            }
            if (f.dateTo) {
                const dt = parseInt(f.dateTo.replace(/-/g,''));
                result = result.filter(o => parseInt((o.created_at||'').slice(0,10).replace(/-/g,'')) <= dt);
            }
            if (f.sort === 'date_new') result.sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)));
            else if (f.sort === 'date_old') result.sort((a,b) => String(a.created_at).localeCompare(String(b.created_at)));
            else if (f.sort === 'amount_high') result.sort((a,b) => b.total-a.total);
            else if (f.sort === 'amount_low') result.sort((a,b) => a.total-b.total);
            else if (f.sort === 'customer') result.sort((a,b) => (a.customerName||a.customer||'').localeCompare(b.customerName||b.customer||''));
            return result;
        },
        // ---- Expenses Filters & Sort ----
        filteredExpenses() {
            let result = this.expenses.slice();
            // Search
            if (this.expenseFilters.search) {
                const q = this.expenseFilters.search.toLowerCase();
                result = result.filter(e =>
                    e.description.toLowerCase().includes(q) ||
                    e.category.toLowerCase().includes(q)
                );
            }
            // Category filter
            if (this.expenseFilters.category) {
                result = result.filter(e => e.category === this.expenseFilters.category);
            }
            // Sort
            if (this.expenseFilters.sortBy === 'date_new') {
                result.sort((a, b) => String(b.date).localeCompare(String(a.date)));
            } else if (this.expenseFilters.sortBy === 'date_old') {
                result.sort((a, b) => String(a.date).localeCompare(String(b.date)));
            } else if (this.expenseFilters.sortBy === 'amount_high') {
                result.sort((a, b) => b.amount - a.amount);
            } else if (this.expenseFilters.sortBy === 'amount_low') {
                result.sort((a, b) => a.amount - b.amount);
            }
            return result;
        }
    },

    methods: {
        // ---- Local Date Helper (avoids UTC off-by-one in timezones ahead of UTC) ----
        localDateStr() {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
        },
        // ---- Navigation ----
        navClass(v) {
            return ['flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                this.view === v ? 'bg-[#00A09D] text-white shadow-lg shadow-teal-900/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'].join(' ');
        },

        // ---- Auth ----
        openRoleLogin(role) {
            this.roleLogin = { show: true, role, username: '', password: '', error: '' };
        },
        closeRoleLogin() {
            this.roleLogin.show = false;
        },
        attemptRoleLogin() {
            this.roleLogin.error = '';
            const u = this.users.find(x => x.username === this.roleLogin.username && x.password === this.roleLogin.password && x.role === this.roleLogin.role);
            if (!u) { this.roleLogin.error = 'Invalid credentials for selected role.'; return; }
            this.session = { username: u.username, role: u.role, fullname: u.fullname };
            this.roleLogin.show = false;
            this.view = 'dashboard';
            this.sidebarOpen = false;
            this.checkStockAlerts();
        },
        attemptCustomerLogin() {
            this.custLogin.error = '';
            const c = this.customers.find(x =>
                x.type === 'regular' &&
                (x.username === this.custLogin.username || x.email === this.custLogin.username) &&
                x.password === this.custLogin.password
            );
            if (!c) { this.custLogin.error = 'Invalid username or password.'; return; }
            this.session = { ...c, role: 'Customer' };
            this.custView = 'overview';
        },
        registerCustomer() {
            this.custRegForm.error = '';
            const f = this.custRegForm;
            if (!f.fullname || !f.phone || !f.email || !f.address || !f.state || !f.username || !f.password || !f.confirmPassword) {
                f.error = 'Please fill all required fields.'; return;
            }
            if (f.password !== f.confirmPassword) { f.error = 'Passwords do not match.'; return; }
            if (this.customers.find(c => c.username === f.username)) { f.error = 'Username already exists.'; return; }
            const newCust = {
                customerId: 'CUST-' + Math.floor(10000 + Math.random() * 90000),
                fullname: f.fullname, company: f.company, phone: f.phone, email: f.email,
                address: f.address, state: f.state, username: f.username, password: f.password,
                type: 'regular', createdAt: this.localDateStr()
            };
            this.customers.push(newCust);
            f.success = 'Account created! You can now log in.';
            setTimeout(() => { this.portalView = 'customer'; }, 1500);
        },

        // ---- Forgot Password ----
        sendResetCode() {
            this.custLogin.forgotError = '';
            const c = this.customers.find(x => x.phone === this.custLogin.forgotPhone && x.type === 'regular');
            if (!c) { this.custLogin.forgotError = 'Phone number not found.'; return; }
            this.custLogin.foundCustomer = c;
            this.custLogin.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
            this.custLogin.forgotStep = 2;
        },
        verifyResetCode() {
            if (this.custLogin.enteredCode !== this.custLogin.generatedCode) {
                this.custLogin.forgotError = 'Invalid code. Please try again.'; return;
            }
            this.custLogin.forgotStep = 3;
            this.custLogin.forgotError = '';
        },
        resetPassword() {
            this.custLogin.forgotError = '';
            if (!this.custLogin.newPassword) { this.custLogin.forgotError = 'Enter a new password.'; return; }
            if (this.custLogin.newPassword !== this.custLogin.confirmNewPassword) { this.custLogin.forgotError = 'Passwords do not match.'; return; }
            const c = this.customers.find(x => x.customerId === this.custLogin.foundCustomer.customerId);
            if (c) c.password = this.custLogin.newPassword;
            alert('Password reset successfully! Please log in with your new password.');
            this.custLogin.forgotMode = false;
            this.custLogin.forgotStep = 1;
            this.custLogin.forgotError = '';
            this.custLogin.foundCustomer = null;
        },

        logout() {
            this.session = null;
            this.view = 'dashboard';
            this.sidebarOpen = false;
            this.portalView = 'select';
            this.custView = 'overview';
        },

        // ---- Formatting ----
        formatMoney(val) { if (!val && val !== 0) return '0'; return Number(val).toLocaleString(); },
        formatDate(d) {
            if (!d) return '';
            // Parse YYYY-MM-DD as local date (not UTC) to avoid off-by-one in UTC+ timezones
            const s = String(d).slice(0, 10);
            const [y, m, day] = s.split('-').map(Number);
            if (!y || !m || !day) return s;
            const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            return day + ' ' + (months[m-1] || m) + ' ' + y;
        },
        statusClass(s) {
            const map = { quotation: 'bg-gray-100 text-gray-500', confirmed: 'bg-blue-100 text-blue-600', partial_delivery: 'bg-blue-200 text-blue-700', delivered: 'bg-green-100 text-green-600' };
            return map[s] || 'bg-gray-100 text-gray-500';
        },
        activityIcon(s) {
            const map = { quotation: 'fas fa-file-alt', confirmed: 'fas fa-check', delivered: 'fas fa-truck' };
            return map[s] || 'fas fa-circle';
        },
        activityIconClass(s) {
            const map = { quotation: 'bg-gray-100 text-gray-500', confirmed: 'bg-blue-100 text-blue-600', delivered: 'bg-green-100 text-green-600' };
            return map[s] || 'bg-gray-100 text-gray-500';
        },

        // ---- Order Flow ----
        openActionModal() {
            this.modal.userError = '';
            this.modal.isEdit = false;
            this.modal.activeIndex = null;
            this.form = {
                customer: '', status: 'quotation',
                orderLines: [{ name: '', qty: 1, unitPrice: 0, amount: 0 }],
                // customer select
                custSelectType: 'regular',
                selectedCustomer: null,
                custSearchQuery: '',
                custSearchOpen: false,
                walkinName: '',
                walkinPhone: '',
                pName: '', stock: 0, price: 0,
                uFullname: '', uUsername: '', uPassword: '', uRole: 'Sales',
                expCategory: '', expDescription: '', expAmount: 0, expDate: this.localDateStr(),
                custType: 'regular', custFullname: '', custCompany: '', custPhone: '', custEmail: '', custAddress: '', custState: '', custUsername: '', custPassword: ''
            };
            if (this.view === 'suppliers') { this.openSupplierModal(); return; }
            this.modal.show = true;
        },
        addOrderLine() {
            this.form.orderLines.unshift({ name: '', qty: 1, unitPrice: 0, amount: 0 });
        },
        selectCustomer(c) {
            this.form.selectedCustomer = c;
            this.form.custSearchQuery = '';
            this.form.custSearchOpen = false;
        },
        removeOrderLine(idx) {
            this.form.orderLines.splice(idx, 1);
        },
        autoFillLinePrice(line) {
            const p = this.products.find(x => x.name === line.name);
            if (p) { line.unitPrice = p.price; this.recalcLine(line); }
        },
        recalcLine(line) {
            line.amount = (line.qty || 0) * (line.unitPrice || 0);
        },
        // Keep old names as no-ops for safety
        updateUnitPrice() {},
        calculateTotal() {},
        updateOrderStatus(order, next) {
            order.status = next;
            this.notifs.unshift({ title: 'Order Updated', msg: `${order.id} is now ${next}` });
        },
        toggleDeliveryMenu(order) {
            this.deliveryMenu.orderId = this.deliveryMenu.orderId === order.id ? null : order.id;
        },
        completeDelivery(order) {
            this.deliveryMenu.orderId = null;
            order.status = 'delivered';
            // Record full delivery quantities
            order.items.forEach(it => {
                it.deliveredQty = it.qty;
            });
            this.notifs.unshift({ title: 'Order Delivered', msg: `${order.id} fully delivered.` });
        },
        openPartialDelivery(order) {
            this.deliveryMenu.orderId = null;
            // Build lines from order items (track already delivered)
            const lines = order.items.map(it => ({
                name: it.name,
                orderedQty: it.qty,
                alreadyDelivered: it.deliveredQty || 0,
                remainingQty: it.qty - (it.deliveredQty || 0),
                deliverNow: 0
            }));
            this.partialDeliveryModal = { show: true, order, lines, error: '' };
        },
        submitPartialDelivery() {
            const m = this.partialDeliveryModal;
            m.error = '';
            const hasAny = m.lines.some(l => l.deliverNow > 0);
            if (!hasAny) { m.error = 'Enter at least one quantity to deliver.'; return; }
            for (const l of m.lines) {
                if (l.deliverNow < 0) { m.error = 'Quantities cannot be negative.'; return; }
                if (l.deliverNow > l.remainingQty) { m.error = `"${l.name}": Cannot deliver more than remaining balance (${l.remainingQty}).`; return; }
            }
            // Update delivered quantities on the order items
            m.lines.forEach(l => {
                const it = m.order.items.find(x => x.name === l.name);
                if (it) it.deliveredQty = (it.deliveredQty || 0) + Number(l.deliverNow);
            });
            // Check if everything is now fully delivered
            const allDone = m.order.items.every(it => (it.deliveredQty || 0) >= it.qty);
            m.order.status = allDone ? 'delivered' : 'partial_delivery';
            this.notifs.unshift({ title: allDone ? 'Order Delivered' : 'Partial Delivery Recorded', msg: `${m.order.id}: ${allDone ? 'All goods delivered.' : 'Partial delivery recorded. Balance remaining.'}` });
            m.show = false;
        },
        confirmPayment(order) {
            // Open the staff payment modal to confirm payment and move to confirmed
            this.openStaffPaymentModal(order);
        },
        // ---- Customer Order (Multi-Product Cart) ----
        openFreshCart() {
            this.custOrderModal = {
                show: true,
                cartLines: [{ name: '', qty: 1, unitPrice: 0, amount: 0 }],
                type: 'quotation'
            };
        },
        openCustomerOrder(p) {
            // Legacy: open cart with product pre-filled
            this.custOrderModal = {
                show: true,
                cartLines: [{ name: p.name, qty: 1, unitPrice: p.price, amount: p.price }],
                type: 'quotation'
            };
        },
        addToCartAndOpen(p) {
            if (this.custOrderModal.show) {
                // add to existing open cart at the top
                const existing = this.custOrderModal.cartLines.find(l => l.name === p.name);
                if (existing) { existing.qty += 1; this.recalcCustLine(existing); }
                else { this.custOrderModal.cartLines.unshift({ name: p.name, qty: 1, unitPrice: p.price, amount: p.price }); }
            } else {
                this.custOrderModal = {
                    show: true,
                    cartLines: [{ name: p.name, qty: 1, unitPrice: p.price, amount: p.price }],
                    type: 'quotation'
                };
            }
        },
        addCustCartLine() {
            this.custOrderModal.cartLines.unshift({ name: '', qty: 1, unitPrice: 0, amount: 0 });
        },
        removeCustCartLine(idx) {
            this.custOrderModal.cartLines.splice(idx, 1);
        },
        autoFillCustLine(line) {
            const p = this.products.find(x => x.name === line.name);
            if (p) { line.unitPrice = p.price; this.recalcCustLine(line); }
        },
        recalcCustLine(line) {
            line.amount = (line.qty || 0) * (line.unitPrice || 0);
        },
        submitCustomerOrder() {
            const validLines = this.custOrderModal.cartLines.filter(l => l.name && l.qty > 0);
            if (validLines.length === 0) { alert('Please add at least one product with a valid quantity.'); return; }

            // Validate stock — customers cannot order out-of-stock items
            for (const line of validLines) {
                const prod = this.products.find(x => x.name === line.name);
                if (!prod) { alert(`Product "${line.name}" not found.`); return; }
                if (prod.stock <= 0) { alert(`"${line.name}" is currently out of stock. Please contact us for more information.`); return; }
                if (line.qty > prod.stock) { alert(`"${line.name}" only has ${prod.stock} ${prod.unit} in stock.`); return; }
            }

            const id = 'SO' + Math.floor(1000 + Math.random() * 9000);
            const items = validLines.map(l => ({ name: l.name, qty: l.qty, amount: l.amount }));
            const total = validLines.reduce((s, l) => s + (l.amount || 0), 0);

            const displayName = this.session.company
                ? `${this.session.fullname} (${this.session.company})`
                : this.session.fullname;

            this.orders.unshift({
                id,
                customer: `${displayName} — ${this.session.customerId}`,
                customerName: displayName,
                customerId: this.session.customerId,
                items, total,
                amountPaid: 0,
                status: 'quotation', paymentStatus: 'unpaid', paymentRef: '', paymentMethod: '', bankName: '', paymentDate: '',
                created_at: this.localDateStr()
            });
            this.custOrderModal.show = false;
            this.notifs.unshift({ title: 'New Order', msg: `Order ${id} (${items.length} item${items.length > 1 ? 's' : ''}) placed by ${this.session.fullname}` });
            this.custView = 'orders';
        },

        // ---- Customer Payment ----
        openPaymentModal(order) {
            this.paymentModal = { show: true, order, mode: 'bank', selectedBank: this.banks[0]?.name || '', bankAmount: Math.max(0, order.total - (order.amountPaid||0)), cashAmount: 0, reference: order.id + '-PAY' };
        },
        submitPayment() {
            const bankAmt = Number(this.paymentModal.bankAmount) || 0;
            const cashAmt = Number(this.paymentModal.cashAmount) || 0;
            const totalPaying = bankAmt + cashAmt;
            if (totalPaying <= 0) { alert('Enter a payment amount'); return; }
            if (!this.paymentModal.reference.trim()) { alert('Enter a payment reference'); return; }
            if ((this.paymentModal.mode === 'bank' || this.paymentModal.mode === 'mixed') && !this.paymentModal.selectedBank && bankAmt > 0) { alert('Please select a bank'); return; }
            const o = this.orders.find(x => x.id === this.paymentModal.order.id);
            if (o) {
                o.paymentStatus = 'pending_confirmation';
                o.paymentRef = this.paymentModal.reference;
                o.paymentMethod = this.paymentModal.mode;
                o.bankName = this.paymentModal.selectedBank || '';
                o.paymentDate = this.localDateStr();
            }
            this.paymentModal.show = false;
            this.notifs.unshift({ title: 'Payment Submitted', msg: `Payment for ${this.paymentModal.order?.id} awaiting confirmation.` });
            alert('Payment submitted! The Sales team will confirm your payment shortly.');
        },

        // ---- Receipt ----
        downloadReceipt(order) {
            const receiptHTML = this.buildReceiptHTML(order);
            const blob = new Blob([receiptHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Receipt-${order.id}.html`;
            a.click();
            URL.revokeObjectURL(url);
        },
        printReceipt(order) {
            const receiptHTML = this.buildReceiptHTML(order);
            const printWindow = window.open('', '_blank');
            printWindow.document.write(receiptHTML);
            printWindow.document.close();
            setTimeout(() => { printWindow.print(); }, 500);
        },
        buildReceiptHTML(order) {
            return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Receipt - ${order.id}</title>
<style>
body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}
.header{text-align:center;border-bottom:3px solid #714B67;padding-bottom:20px;margin-bottom:30px;}
.header h1{color:#714B67;margin:0;font-size:32px;}
.header p{color:#666;margin:5px 0;}
.receipt-info{display:flex;justify-content:space-between;margin-bottom:30px;}
.receipt-info div{flex:1;}
.receipt-info strong{display:block;color:#714B67;margin-bottom:5px;}
table{width:100%;border-collapse:collapse;margin:20px 0;}
th{background:#714B67;color:white;padding:12px;text-align:left;}
td{padding:12px;border-bottom:1px solid #ddd;}
.total-row{background:#f9f9f9;font-weight:bold;font-size:18px;}
.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#666;font-size:12px;}
.badge{display:inline-block;padding:5px 15px;background:#00A09D;color:white;border-radius:20px;font-size:12px;font-weight:bold;text-transform:uppercase;}
</style></head><body>
<div class="header"><h1>LADU INVESTMENT</h1><p>Construction Materials & Equipment</p><p style="font-size:12px;margin-top:10px">Lagos, Nigeria | info@laduinvestment.com</p></div>
<div style="text-align:center;margin:30px 0"><h2 style="color:#714B67;margin:0">OFFICIAL RECEIPT</h2><p style="color:#666;margin:5px 0">Receipt No: ${order.id}</p><span class="badge">PAID</span></div>
<div class="receipt-info">
<div><strong>Customer:</strong><p>${order.customerName || order.customer}</p><p style="font-size:12px;color:#999">ID: ${order.customerId || 'Walk-in'}</p><p style="font-size:12px;color:#999">${(order.customerName && order.customer !== order.customerName) ? order.customer.replace(order.customerName, '').replace('—','').trim() : ''}</p></div>
<div style="text-align:right"><strong>Date:</strong><p>${this.formatDate(order.paymentDate || order.created_at)}</p><strong>Payment Method:</strong><p style="text-transform:capitalize">${order.paymentMethod || 'N/A'}</p></div>
</div>
<table><thead><tr><th>Item Description</th><th style="text-align:center">Qty</th><th style="text-align:right">Amount (₦)</th></tr></thead>
<tbody>
${order.items.map(i => `<tr><td>${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">₦${this.formatMoney(i.amount)}</td></tr>`).join('')}
<tr class="total-row"><td colspan="2" style="text-align:right">TOTAL PAID:</td><td style="text-align:right">₦${this.formatMoney(order.total)}</td></tr>
</tbody></table>
<div class="footer"><p><strong>Thank you for your business!</strong></p><p>This is a computer-generated receipt. Payment Ref: ${order.paymentRef || 'N/A'}</p><p>Generated: ${new Date().toLocaleString()}</p></div>
</body></html>`;
        },

        // ---- Inventory ----
        editProduct(p) {
            this.modal.isEdit = true;
            this.modal.activeIndex = this.products.indexOf(p);
            this.form = { ...this.form, pName: p.name, stock: p.stock, price: p.price };
            this.modal.show = true;
        },
        deleteProduct(idx) { if (confirm('Delete this product?')) this.products.splice(idx, 1); },

        // ---- Expenses ----
        deleteExpense(expense) {
            if (confirm('Delete this expense?')) {
                const idx = this.expenses.indexOf(expense);
                if (idx > -1) {
                    this.expenses.splice(idx, 1);
                    this.notifs.unshift({ title: 'Expense Deleted', msg: 'Record removed.' });
                }
            }
        },

        // ---- Users ----
        deleteUser(idx) { if (confirm('Remove user access?')) this.users.splice(idx, 1); },
        deleteCustomer(id) {
            if (confirm('Remove customer?')) {
                const idx = this.customers.findIndex(c => c.customerId === id);
                if (idx > -1) this.customers.splice(idx, 1);
            }
        },

        // ---- Chat ----
        sendMessage() {
            if (!this.newMessage.trim()) return;
            this.messages.push({ from: this.session.fullname, text: this.newMessage });
            this.newMessage = '';
        },

        // ---- Alerts ----
        checkStockAlerts() {
            this.lowStockProducts.forEach(p => {
                const exists = this.notifs.find(n => n.msg.includes(p.name));
                if (!exists) this.notifs.unshift({ title: 'Low Stock Alert', msg: `${p.name} only has ${p.stock} remaining!` });
            });
        },

        // ---- Record Submission ----
        submitRecord() {
            if (this.view === 'sales') {
                // Resolve customer identity
                let customerName = '';
                let customerId = '';
                let customerDisplay = '';

                if (this.form.custSelectType === 'regular') {
                    if (!this.form.selectedCustomer) { alert('Please search and select a customer.'); return; }
                    const c = this.form.selectedCustomer;
                    customerName = c.company ? `${c.fullname} (${c.company})` : c.fullname;
                    customerId = c.customerId;
                    customerDisplay = `${customerName} — ${c.customerId}`;
                } else {
                    // Walk-in
                    if (!this.form.walkinName.trim()) { alert('Enter a walk-in customer name.'); return; }
                    const walkId = 'WALK-' + Math.floor(10000 + Math.random() * 90000);
                    customerName = this.form.walkinName.trim();
                    customerId = walkId;
                    customerDisplay = `${customerName} (Walk-in) — ${walkId}`;
                    // Auto-register as temporary customer for record
                    this.customers.push({
                        customerId: walkId,
                        fullname: this.form.walkinName.trim(),
                        company: '',
                        phone: this.form.walkinPhone || '',
                        email: '',
                        address: '',
                        state: '',
                        username: '',
                        password: '',
                        type: 'temporary',
                        createdAt: this.localDateStr()
                    });
                }

                const validLines = (this.form.orderLines || []).filter(l => l.name && l.qty > 0);
                if (validLines.length === 0) { alert('Add at least one product line with a quantity.'); return; }
                // Out-of-stock restriction: only Admin can create quotations for out-of-stock items
                if (this.session.role !== 'Admin') {
                    for (const line of validLines) {
                        const prod = this.products.find(p => p.name === line.name);
                        if (!prod || prod.stock <= 0) {
                            alert(`"${line.name}" is out of stock. Only Admin can create quotations for out-of-stock items.`);
                            return;
                        }
                    }
                }
                const id = 'SO' + Math.floor(1000 + Math.random() * 9000);
                const items = validLines.map(l => ({ name: l.name, qty: l.qty, amount: l.amount || 0 }));
                const total = items.reduce((s, i) => s + i.amount, 0);
                this.orders.unshift({
                    id,
                    customer: customerDisplay,
                    customerName,
                    customerId,
                    items, total,
                    amountPaid: 0,
                    status: this.form.status, paymentStatus: 'unpaid', paymentRef: '', paymentMethod: '', bankName: '', paymentDate: '',
                    created_at: this.localDateStr()
                });
                this.notifs.unshift({ title: 'Order Created', msg: `${id} created for ${customerName}` });
            } else if (this.view === 'inventory') {
                if (!this.form.pName.trim() || !this.form.stock || !this.form.price) { alert('Fill all required fields'); return; }
                if (this.modal.isEdit && this.modal.activeIndex !== null) {
                    const p = this.products[this.modal.activeIndex];
                    p.name = this.form.pName; p.stock = this.form.stock; p.price = this.form.price;
                } else {
                    this.products.unshift({ name: this.form.pName, category: 'General', stock: this.form.stock, unit: 'units', price: this.form.price });
                }
            } else if (this.view === 'expenses') {
                if (!this.form.expCategory || !this.form.expDescription.trim() || !this.form.expAmount || !this.form.expDate) { alert('Fill all required fields'); return; }
                this.expenses.unshift({ date: this.form.expDate, category: this.form.expCategory, description: this.form.expDescription, amount: this.form.expAmount });
                this.notifs.unshift({ title: 'Expense Added', msg: `${this.form.expCategory}: ₦${this.formatMoney(this.form.expAmount)}` });
            } else if (this.view === 'users') {
                this.modal.userError = '';
                if (!this.form.uFullname.trim() || !this.form.uUsername.trim() || !this.form.uPassword.trim()) { this.modal.userError = 'All fields required.'; return; }
                if (this.users.find(u => u.username === this.form.uUsername)) { this.modal.userError = 'Username already exists.'; return; }
                this.users.push({ fullname: this.form.uFullname, username: this.form.uUsername, password: this.form.uPassword, role: this.form.uRole });
            } else if (this.view === 'customers') {
                this.modal.userError = '';
                if (!this.form.custFullname.trim() || !this.form.custPhone.trim() || !this.form.custEmail.trim() || !this.form.custAddress.trim() || !this.form.custState) {
                    this.modal.userError = 'Fill all required fields.'; return;
                }
                if (this.form.custType === 'regular') {
                    if (!this.form.custUsername.trim() || !this.form.custPassword.trim()) { this.modal.userError = 'Username and password required for regular customers.'; return; }
                    if (this.customers.find(c => c.username === this.form.custUsername)) { this.modal.userError = 'Username already exists.'; return; }
                }
                const newCust = {
                    customerId: 'CUST-' + Math.floor(10000 + Math.random() * 90000),
                    fullname: this.form.custFullname, company: this.form.custCompany, phone: this.form.custPhone,
                    email: this.form.custEmail, address: this.form.custAddress, state: this.form.custState,
                    username: this.form.custType === 'regular' ? this.form.custUsername : '',
                    password: this.form.custType === 'regular' ? this.form.custPassword : '',
                    type: this.form.custType, createdAt: this.localDateStr()
                };
                this.customers.push(newCust);
                this.notifs.unshift({ title: 'Customer Added', msg: `${newCust.fullname} (${newCust.customerId}) added.` });
            }
            this.modal.show = false;
            this.checkStockAlerts();
        },

        // ---- Reports ----
        generateReport() {
            const fromInt = this.report.date_from ? parseInt(this.report.date_from.replace(/-/g,'')) : null;
            const toInt = this.report.date_to ? parseInt(this.report.date_to.replace(/-/g,'')) : null;
            const aggr = {};
            let totalQty = 0, totalAmount = 0, totalBankAmt = 0, totalCashAmt = 0, totalOutstanding = 0;
            this.orders.forEach(o => {
                if ((o.amountPaid||0) <= 0 && o.paymentStatus === 'unpaid') return;
                const d = parseInt((o.created_at||'').slice(0,10).replace(/-/g,''));
                if (fromInt && d < fromInt) return;
                if (toInt && d > toInt) return;
                if (this.report.method !== '__all__' && o.paymentMethod !== this.report.method) return;
                o.items.forEach(it => {
                    if (this.report.product !== '__all__' && it.name !== this.report.product) return;
                    if (!aggr[it.name]) aggr[it.name] = { name: it.name, qty: 0, amount: 0, outstanding: 0 };
                    aggr[it.name].qty += it.qty;
                    aggr[it.name].amount += it.amount;
                    totalQty += it.qty;
                    totalAmount += it.amount;
                });
                if (o.paymentMethod === 'bank' || o.paymentMethod === 'transfer') totalBankAmt += (o.amountPaid||0);
                else if (o.paymentMethod === 'cash') totalCashAmt += (o.amountPaid||0);
                else if (o.paymentMethod === 'mixed') { totalBankAmt += (o.amountPaid||0) * 0.5; totalCashAmt += (o.amountPaid||0) * 0.5; }
                totalOutstanding += Math.max(0, o.total - (o.amountPaid||0));
            });
            this.reportResults.items = Object.values(aggr);
            this.reportResults.totalQty = totalQty;
            this.reportResults.totalAmount = totalAmount;
            this.reportResults.bankAmount = totalBankAmt;
            this.reportResults.cashAmount = totalCashAmt;
            this.reportResults.outstanding = totalOutstanding;
        },
        generateExpenseReport() {
            const fromInt = this.expenseReport.date_from ? parseInt(this.expenseReport.date_from.replace(/-/g,'')) : null;
            const toInt = this.expenseReport.date_to ? parseInt(this.expenseReport.date_to.replace(/-/g,'')) : null;
            const filtered = this.expenses.filter(e => {
                const d = parseInt((e.date||'').slice(0,10).replace(/-/g,''));
                if (fromInt && d < fromInt) return false;
                if (toInt && d > toInt) return false;
                if (this.expenseReport.category !== '__all__' && e.category !== this.expenseReport.category) return false;
                return true;
            });
            this.expenseReportResults.items = filtered;
            this.expenseReportResults.total = filtered.reduce((s, e) => s + e.amount, 0);
        },
        // ---- PDF safe formatter (no special unicode that jsPDF can't render) ----
        pdfMoney(val) { return 'NGN ' + Number(val||0).toLocaleString('en-US'); },
        pdfText(str) { return (str||'').replace(/₦/g,'NGN ').replace(/×/g,'x').replace(/—/g,'-').replace(/\u20a6/g,'NGN '); },
        printOrDownload(title, bodyContent) {
            const w = window.open('', '_blank');
            w.document.write('<html><head><title>'+title+'</title><style>body{font-family:monospace;padding:20px;font-size:13px;}h2{margin-bottom:10px;}pre{white-space:pre-wrap;line-height:1.6;}</style></head><body><h2>'+title+'</h2><pre>'+bodyContent+'</pre><scr'+'ipt>window.print();<'+'/scr'+'ipt></body></html>');
            w.document.close();
        },
        // ---- PDF Generation Helper ----
        createPDFDoc(title) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const lw = doc.internal.pageSize.getWidth();
            doc.setFillColor(113, 75, 103);
            doc.rect(0, 0, lw, 30, 'F');
            doc.setTextColor(255,255,255);
            doc.setFontSize(14); doc.setFont(undefined,'bold');
            doc.text('LADU INVESTMENT', 14, 12);
            doc.setFontSize(8); doc.setFont(undefined,'normal');
            doc.text('Construction Materials & Equipment', 14, 18);
            doc.text('Email: info@laduinvestment.com  |  Tel: +234 800 000 0000', 14, 23);
            doc.text('Address: 1 Ladu Avenue, Lagos, Nigeria', 14, 28);
            doc.setTextColor(0,0,0);
            doc.setFontSize(12); doc.setFont(undefined,'bold');
            doc.text(title, lw/2, 40, { align: 'center' });
            doc.setFontSize(8); doc.setFont(undefined,'normal');
            doc.setTextColor(100,100,100);
            doc.text('Generated: ' + new Date().toLocaleString(), lw-14, 40, { align: 'right' });
            doc.setDrawColor(200,200,200); doc.line(14, 43, lw-14, 43);
            return { doc, y: 48, lw };
        },
        addPDFFooter(doc) {
            const lw = doc.internal.pageSize.getWidth();
            const ph = doc.internal.pageSize.getHeight();
            doc.setFontSize(8);
            doc.setTextColor(150,150,150);
            doc.line(14, ph-25, lw-14, ph-25);
            doc.text('Authorized Signature: ___________________________', 14, ph-18);
            doc.text('Manager, Ladu Investment', 14, ph-13);
            doc.text('Page 1', lw/2, ph-8, { align: 'center' });
        },
        downloadCustomerHistoryPDF() {
            const m = this.customerHistoryModal;
            const nm = m.customer?.fullname || m.customer?.fullName || m.customer?.name || '';
            const { doc, lw } = this.createPDFDoc('CUSTOMER ACCOUNT STATEMENT');
            let y = 52;
            doc.setFillColor(245,245,245); doc.rect(14, y, lw-28, 22, 'F');
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0);
            doc.text('Customer: ' + nm, 18, y+6);
            doc.setFont(undefined,'normal'); doc.setFontSize(8);
            doc.text('ID: ' + (m.customer?.customerId||''), 18, y+11);
            doc.text('Phone: ' + (m.customer?.phone||'N/A') + '  |  Email: ' + (m.customer?.email||'N/A'), 18, y+16);
            doc.text('Address: ' + (m.customer?.address||'N/A') + ', ' + (m.customer?.state||''), lw/2, y+11);
            y += 28;
            doc.autoTable({ startY: y, head: [['Total Purchases (NGN)','Total Paid (NGN)','Outstanding Balance (NGN)']], body: [[this.pdfMoney(m.totalPurchases), this.pdfMoney(m.totalPaid), this.pdfMoney(m.outstanding)]], styles: { fontSize: 9 }, headStyles: { fillColor: [0,160,157] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 8;
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0);
            doc.text('ORDER HISTORY', 14, y); y += 4;
            const orders = (this.filteredHistoryOrders.length ? this.filteredHistoryOrders : m.orders);
            const rows = orders.map(o => [
                o.id, this.formatDate(o.created_at),
                o.items.map(i => i.name + ' x' + i.qty).join(', '),
                this.pdfMoney(o.total),
                this.pdfMoney(o.amountPaid||0),
                this.pdfMoney(Math.max(0, o.total-(o.amountPaid||0))),
                (o.paymentStatus||'').toUpperCase()
            ]);
            doc.autoTable({ startY: y, head: [['Order','Date','Items','Total (NGN)','Paid (NGN)','Balance (NGN)','Status']], body: rows, styles: { fontSize: 7.5, cellPadding: 2 }, headStyles: { fillColor: [42,27,38] }, alternateRowStyles: { fillColor: [248,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 8;
            const txns = this.transactions.filter(t=>t.customerId===m.customer?.customerId).slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
            if (txns.length) {
                doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.text('PAYMENT TRANSACTIONS', 14, y); y += 4;
                doc.autoTable({ startY: y, head: [['Date','Ref','Method','Bank','Amount (NGN)','Balance After (NGN)']], body: txns.map(t=>[this.formatDate(t.date), t.ref, t.method||'-', t.bankName||'-', this.pdfMoney(t.amount), this.pdfMoney(t.outstanding||0)]), styles: { fontSize: 7.5, cellPadding: 2 }, headStyles: { fillColor: [0,160,157] }, theme: 'grid', margin: { left: 14, right: 14 } });
            }
            this.addPDFFooter(doc);
            doc.save('Statement-' + nm.replace(/\s+/g,'_') + '-' + this.localDateStr() + '.pdf');
        },
        downloadMyStatementPDF() {
            const orders = this.myOrders;
            const tp = orders.reduce((s,o)=>s+o.total,0);
            const paid = orders.reduce((s,o)=>s+(o.amountPaid||0),0);
            const cust = this.session;
            const { doc, lw } = this.createPDFDoc('MY ACCOUNT STATEMENT');
            let y = 52;
            doc.setFillColor(245,245,245); doc.rect(14, y, lw-28, 16, 'F');
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0);
            doc.text('Customer: ' + cust.fullname, 18, y+6);
            doc.setFont(undefined,'normal'); doc.setFontSize(8);
            doc.text('ID: ' + cust.customerId + '  |  Phone: ' + (cust.phone||'N/A'), 18, y+11);
            y += 22;
            doc.autoTable({ startY: y, head: [['Total Purchases (NGN)','Total Paid (NGN)','Outstanding Balance (NGN)']], body: [[this.pdfMoney(tp), this.pdfMoney(paid), this.pdfMoney(tp-paid)]], styles: { fontSize: 9 }, headStyles: { fillColor: [0,160,157] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 8;
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.text('ORDER HISTORY', 14, y); y += 4;
            doc.autoTable({ startY: y, head: [['Order','Date','Items','Total (NGN)','Paid (NGN)','Balance (NGN)','Status']], body: orders.map(o=>[o.id, this.formatDate(o.created_at), o.items.map(i=>i.name+' x'+i.qty).join(', '), this.pdfMoney(o.total), this.pdfMoney(o.amountPaid||0), this.pdfMoney(Math.max(0,o.total-(o.amountPaid||0))), (o.paymentStatus||'').toUpperCase()]), styles: { fontSize: 7.5, cellPadding: 2 }, headStyles: { fillColor: [42,27,38] }, alternateRowStyles: { fillColor: [248,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            this.addPDFFooter(doc);
            doc.save('MyStatement-' + cust.fullname.replace(/\s+/g,'_') + '-' + this.localDateStr() + '.pdf');
        },
        downloadMyTransactionPDF() {
            const { doc, lw } = this.createPDFDoc('MY TRANSACTION HISTORY');
            let y = 52;
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0);
            doc.text('Customer: ' + this.session.fullname + '  |  ID: ' + this.session.customerId, 14, y); y += 8;
            const txns = this.myTransactions.slice().sort((a,b)=>new Date(b.date)-new Date(a.date));
            doc.autoTable({ startY: y, head: [['Date','Ref','Method','Bank','Amount (NGN)','Balance After (NGN)']], body: txns.map(t=>[this.formatDate(t.date), t.ref, t.method||'-', t.bankName||'-', this.pdfMoney(t.amount), this.pdfMoney(t.outstanding||0)]), styles: { fontSize: 8, cellPadding: 2 }, headStyles: { fillColor: [0,160,157] }, alternateRowStyles: { fillColor: [248,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            this.addPDFFooter(doc);
            doc.save('Transactions-' + this.session.fullname.replace(/\s+/g,'_') + '.pdf');
        },
        downloadGeneralStatementPDF() {
            const { doc, lw } = this.createPDFDoc('OUTSTANDING DEBTS STATEMENT');
            let y = 52;
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0);
            doc.text('Date: ' + new Date().toLocaleDateString(), 14, y); y += 8;
            doc.autoTable({ startY: y, head: [['Customer','ID','Total Purchases (NGN)','Total Paid (NGN)','Outstanding (NGN)']], body: this.customerDebtList.map(x=>[x.name, x.customerId, this.pdfMoney(x.totalPurchases), this.pdfMoney(x.totalPaid), this.pdfMoney(x.outstanding)]), styles: { fontSize: 8, cellPadding: 2 }, headStyles: { fillColor: [220,50,50] }, alternateRowStyles: { fillColor: [255,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 6;
            doc.setFontSize(10); doc.setFont(undefined,'bold');
            doc.text('GRAND TOTAL OUTSTANDING: NGN ' + this.formatMoney(this.totalOutstandingDebts), 14, y);
            this.addPDFFooter(doc);
            doc.save('Outstanding-Statement-' + this.localDateStr() + '.pdf');
        },
        downloadGeneralHistoryPDF() {
            const f = this.filteredGeneralHistory;
            const { doc, lw } = this.createPDFDoc('GENERAL CUSTOMER HISTORY');
            let y = 52;
            doc.setFontSize(8); doc.setFont(undefined,'normal'); doc.setTextColor(80,80,80);
            doc.text('Total Orders: ' + f.length + '  |  Total Value: NGN ' + this.formatMoney(f.reduce((s,o)=>s+o.total,0)) + '  |  Outstanding: NGN ' + this.formatMoney(f.reduce((s,o)=>s+Math.max(0,o.total-(o.amountPaid||0)),0)), 14, y); y += 8;
            doc.autoTable({ startY: y, head: [['Order','Customer','Date','Items','Total (NGN)','Paid (NGN)','Balance (NGN)','Method','Status']], body: f.map(o=>[o.id, o.customerName||o.customer, this.formatDate(o.created_at), o.items.map(i=>i.name.substring(0,14)+' x'+i.qty).join(', '), this.pdfMoney(o.total), this.pdfMoney(o.amountPaid||0), this.pdfMoney(Math.max(0,o.total-(o.amountPaid||0))), o.paymentMethod||'-', (o.paymentStatus||'').toUpperCase()]), styles: { fontSize: 6.5, cellPadding: 1.5 }, headStyles: { fillColor: [42,27,38] }, alternateRowStyles: { fillColor: [248,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            this.addPDFFooter(doc);
            doc.save('GeneralHistory-' + this.localDateStr() + '.pdf');
        },
        exportReport(type) {
            const { doc, lw } = this.createPDFDoc('SALES PERFORMANCE REPORT');
            let y = 52;
            doc.setFontSize(8); doc.setFont(undefined,'normal'); doc.setTextColor(80,80,80);
            doc.text('Period: ' + (this.report.date_from||'All') + ' to ' + (this.report.date_to||'All') + '  |  Product: ' + (this.report.product==='__all__'?'All':this.report.product) + '  |  Method: ' + (this.report.method==='__all__'?'All':this.report.method), 14, y); y += 8;
            doc.autoTable({ startY: y, head: [['Metric','Amount (NGN)']], body: [['Total Revenue', this.pdfMoney(this.reportResults.totalAmount)],['Bank Payments', this.pdfMoney(this.reportResults.bankAmount||0)],['Cash Payments', this.pdfMoney(this.reportResults.cashAmount||0)],['Outstanding', this.pdfMoney(this.reportResults.outstanding||0)]], styles: { fontSize: 9 }, headStyles: { fillColor: [0,160,157] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 8;
            doc.setFontSize(9); doc.setFont(undefined,'bold'); doc.setTextColor(0,0,0); doc.text('PRODUCT BREAKDOWN', 14, y); y += 4;
            doc.autoTable({ startY: y, head: [['Product','Qty Sold','Revenue (NGN)']], body: this.reportResults.items.map(it=>[it.name, it.qty, this.pdfMoney(it.amount)]), styles: { fontSize: 8 }, headStyles: { fillColor: [42,27,38] }, theme: 'grid', margin: { left: 14, right: 14 } });
            this.addPDFFooter(doc);
            doc.save('SalesReport-' + this.localDateStr() + '.pdf');
        },
        exportExpenseReport(type) {
            const { doc, lw } = this.createPDFDoc('EXPENSES REPORT');
            let y = 52;
            doc.autoTable({ startY: y, head: [['Date','Category','Description','Amount (NGN)']], body: (this.expenseReportResults.items||[]).map(e=>[this.formatDate(e.date), e.category||'', e.description||'', this.pdfMoney(e.amount)]), styles: { fontSize: 8, cellPadding: 2 }, headStyles: { fillColor: [220,50,50] }, alternateRowStyles: { fillColor: [255,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            const fy = doc.lastAutoTable.finalY + 6;
            doc.setFontSize(10); doc.setFont(undefined,'bold');
            doc.text('TOTAL EXPENSES: NGN ' + this.formatMoney(this.expenseReportResults.total), 14, fy);
            this.addPDFFooter(doc);
            doc.save('ExpenseReport-' + this.localDateStr() + '.pdf');
        },
                openStaffPaymentModal(order) {
            this.staffPayModal = { show: true, order, mode: 'bank', selectedBank: this.banks[0]?.name || '', bankAmount: Math.max(0, order.total - (order.amountPaid||0)), cashAmount: 0, reference: order.id + '-PAY' };
        },
        submitStaffPayment() {
            const o = this.staffPayModal.order; const bankAmt = Number(this.staffPayModal.bankAmount)||0; const cashAmt = Number(this.staffPayModal.cashAmount)||0; const totalPaying = bankAmt + cashAmt;
            const remaining = Math.max(0, o.total - (o.amountPaid||0));
            if (totalPaying <= 0) { alert('Enter a payment amount'); return; }
            if (totalPaying > remaining + 0.01) { alert('Payment exceeds outstanding balance of ₦' + this.formatMoney(remaining)); return; }
            if ((this.staffPayModal.mode === 'bank' || this.staffPayModal.mode === 'mixed') && bankAmt > 0 && !this.staffPayModal.selectedBank) { alert('Please select a bank'); return; }
            const newPaid = (o.amountPaid||0) + totalPaying; const newOutstanding = Math.max(0, o.total - newPaid);
            const date = this.localDateStr();
            o.amountPaid = newPaid; o.paymentMethod = this.staffPayModal.mode; o.bankName = this.staffPayModal.mode !== 'cash' ? this.staffPayModal.selectedBank : ''; o.paymentRef = this.staffPayModal.reference || (o.id+'-PAY'); o.paymentDate = date;
            if (newOutstanding <= 0.01) { o.paymentStatus = 'paid'; o.status = 'confirmed'; o.amountPaid = o.total; o.items.forEach(it => { const p = this.products.find(x => x.name === it.name); if (p) p.stock = Math.max(0, p.stock - it.qty); }); } else { o.paymentStatus = 'partial'; o.status = 'confirmed'; }
            if (bankAmt > 0) this.bankLedger.push({ date, ref: o.id, customerName: o.customerName, description: 'Bank payment - '+o.customerName, amount: bankAmt, method: 'bank', bankName: this.staffPayModal.selectedBank, runningBalance: 0 });
            if (cashAmt > 0) this.bankLedger.push({ date, ref: o.id, customerName: o.customerName, description: 'Cash payment - '+o.customerName, amount: cashAmt, method: 'cash', bankName: '', runningBalance: 0 });
            const txnId = 'TXN'+String(this.transactions.length+1).padStart(3,'0');
            this.transactions.push({ id: txnId, customerId: o.customerId, ref: o.id, description: 'Payment for '+(o.items[0]?.name||'order'), amount: totalPaying, date, type: newOutstanding<=0.01?'payment':'partial_payment', method: o.paymentMethod, bankName: o.bankName, outstanding: newOutstanding });
            this.notifs.unshift({ title: 'Payment Recorded', msg: '₦'+this.formatMoney(totalPaying)+' recorded for '+o.id+(newOutstanding>0?' | Balance: ₦'+this.formatMoney(newOutstanding):' | FULLY PAID!') });
            this.staffPayModal.show = false;
            this.checkStockAlerts();
        },
        setInitialCash() {
            if (!this.newInitialCash || this.newInitialCash < 0) { alert('Enter a valid amount'); return; }
            this.initialCash = Number(this.newInitialCash); this.showCashSetup = false; this.newInitialCash = 0;
            this.notifs.unshift({ title: 'Drawer Setup', msg: 'Initial drawer cash set to ₦'+this.formatMoney(this.initialCash) });
        },
        updateBankOpening(bankName, val) {
            const b = this.banks.find(x => x.name === bankName);
            if (b) {
                b.openingBalance = Number(val) || 0;
                this.notifs.unshift({ title: 'Bank Updated', msg: bankName + ' opening balance set to ₦' + this.formatMoney(b.openingBalance) });
            }
        },
        viewCustomerHistory(c) {
            const cOrders = this.orders.filter(o => o.customerId === c.customerId);
            const tp = cOrders.reduce((s,o)=>s+o.total,0); const paid = cOrders.reduce((s,o)=>s+(o.amountPaid||0),0);
            this.customerHistoryModal = { show: true, customer: c, orders: cOrders, totalPurchases: tp, totalPaid: paid, outstanding: tp-paid, histFilter: { status: '', dateFrom: '', dateTo: '', sort: 'date_new' } };
        },
        openPayForCustomer(c) {
            // Open the customer history modal but with a "Record Payment" mode
            const cOrders = this.orders.filter(o => o.customerId === c.customerId && o.paymentStatus !== 'paid');
            if (cOrders.length === 0) {
                alert((c.fullname || c.name) + ' has no outstanding orders to pay.');
                return;
            }
            // Open staff pay modal on the first unpaid order, or show history to pick
            const tp = this.orders.filter(o=>o.customerId===c.customerId).reduce((s,o)=>s+o.total,0);
            const paid = this.orders.filter(o=>o.customerId===c.customerId).reduce((s,o)=>s+(o.amountPaid||0),0);
            this.customerHistoryModal = { show: true, customer: c, orders: this.orders.filter(o=>o.customerId===c.customerId), totalPurchases: tp, totalPaid: paid, outstanding: tp-paid, payMode: true, histFilter: { status: '', dateFrom: '', dateTo: '', sort: 'date_new' } };
        },
        // ---- Purchase Methods ----
        markPurchaseArrived(idx) {
            const p = this.purchases[idx];
            if (!confirm('Mark ' + p.id + ' as arrived? Stock will be updated automatically for all items.')) return;
            p.status = 'arrived';
            const updates = [];
            // Increment stock now that goods have physically arrived
            (p.items || []).forEach(it => {
                const prod = this.products.find(x => x.name === it.name);
                if (prod) {
                    prod.stock += it.qty;
                    updates.push(it.name + ' +' + it.qty);
                }
            });
            const updateMsg = updates.length ? ' | ' + updates.join(', ') : '';
            this.notifs.unshift({ title: 'Stock Updated ✓', msg: p.id + ' arrived. Stock incremented:' + updateMsg });
            this.checkStockAlerts();
        },
        editPurchase(idx) {
            const p = this.purchases[idx];
            this.purchaseModal = {
                show: true, supplier: p.source, date: p.date,
                lines: p.items.map(i => ({ name: i.name, customName: '', qty: i.qty, unitCost: i.price || 0, amount: (i.qty * (i.price||0)) })),
                bankRows: p.bankRows ? p.bankRows.map(r => ({ ...r })) : [],
                useCash: (p.cashPaid || 0) > 0, cashAmount: p.cashPaid || 0,
                reference: p.paymentRef || p.id, error: '', editIdx: idx
            };
        },
        // ---- Supplier Methods ----
        openSupplierModal(s) {
            if (s) {
                this.supplierModal = { show: true, isEdit: true, editId: s.id, name: s.name, contact: s.contact||'', phone: s.phone||'', email: s.email||'', address: s.address||'', type: s.type, category: s.category||'', notes: s.notes||'', error: '' };
            } else {
                this.supplierModal = { show: true, isEdit: false, editId: null, name: '', contact: '', phone: '', email: '', address: '', type: 'permanent', category: '', notes: '', error: '' };
            }
        },
        saveSupplier() {
            const sm = this.supplierModal;
            sm.error = '';
            if (!sm.name.trim()) { sm.error = 'Supplier name is required.'; return; }
            if (this.suppliers.some(s => s.name.toLowerCase() === sm.name.trim().toLowerCase() && s.id !== sm.editId)) {
                sm.error = 'A supplier with this name already exists.'; return;
            }
            if (sm.isEdit) {
                const idx = this.suppliers.findIndex(s => s.id === sm.editId);
                if (idx > -1) {
                    this.suppliers[idx] = { ...this.suppliers[idx], name: sm.name.trim(), contact: sm.contact, phone: sm.phone, email: sm.email, address: sm.address, type: sm.type, category: sm.category, notes: sm.notes };
                }
            } else {
                const newId = 'SUP-' + String(this.suppliers.length + 1).padStart(3, '0');
                this.suppliers.push({ id: newId, name: sm.name.trim(), contact: sm.contact, phone: sm.phone, email: sm.email, address: sm.address, type: sm.type, category: sm.category, notes: sm.notes, createdAt: this.localDateStr() });
                this.notifs.unshift({ title: 'Supplier Added', msg: sm.name.trim() + ' has been registered as a ' + sm.type + ' supplier.' });
            }
            sm.show = false;
        },
        deleteSupplier(s) {
            if (!confirm('Delete supplier "' + s.name + '"? This cannot be undone.')) return;
            this.suppliers = this.suppliers.filter(x => x.id !== s.id);
        },
        openAddPurchaseModal() {
            this.purchaseModal = { show: true, supplier: '', supplierCustom: '', date: this.localDateStr(), lines: [{ name: '', customName: '', qty: 1, unitCost: 0, amount: 0 }], bankRows: [], useCash: false, cashAmount: 0, reference: '', error: '', editIdx: null };
        },
        addPurchaseBankRow() {
            this.purchaseModal.bankRows.push({ bankName: this.banks[0]?.name || '', amount: 0 });
        },
        addPurchaseLine() {
            this.purchaseModal.lines.push({ name: '', customName: '', qty: 1, unitCost: 0, amount: 0 });
        },
        autoPurchasePrice(line) {
            if (line.name === '__custom__') { line.unitCost = 0; line.amount = 0; return; }
            const p = this.products.find(x => x.name === line.name);
            if (p) { line.unitCost = p.price; }
            this.recalcPurchaseLine(line);
        },
        recalcPurchaseLine(line) {
            line.amount = (line.qty || 0) * (line.unitCost || 0);
        },
        submitPurchase() {
            const pm = this.purchaseModal;
            pm.error = '';
            if (!pm.supplier.trim()) { pm.error = 'Select or enter a supplier name.'; return; }
            if (pm.supplier === '__other__' && !pm.supplierCustom.trim()) { pm.error = 'Please enter the supplier name.'; return; }
            const supplierName = pm.supplier === '__other__' ? pm.supplierCustom.trim() : pm.supplier;
            if (!pm.date) { pm.error = 'Select a date.'; return; }
            const validLines = pm.lines.filter(l => (l.name && l.name !== '__custom__' || l.customName) && l.qty > 0);
            if (validLines.length === 0) { pm.error = 'Add at least one item with quantity.'; return; }

            // Validate payment
            const cashAmt = pm.useCash ? (Number(pm.cashAmount) || 0) : 0;
            const validBankRows = pm.bankRows.filter(r => r.amount > 0);
            const totalBankAmt = validBankRows.reduce((s, r) => s + (r.amount || 0), 0);
            const totalPaying = totalBankAmt + cashAmt;
            if (totalPaying <= 0) { pm.error = 'Add at least one payment source with an amount.'; return; }
            for (const row of validBankRows) {
                if (!row.bankName) { pm.error = 'Select a bank for each bank payment row.'; return; }
            }

            const date = pm.date;
            const poId = 'PO' + String(this.purchases.length + 1).padStart(3, '0') + '-' + Math.floor(100 + Math.random() * 900);
            const totalAmt = pm.lines.reduce((s, l) => s + (l.amount || 0), 0);
            const items = validLines.map(l => ({ name: l.name === '__custom__' ? l.customName : l.name, qty: l.qty, price: l.unitCost }));

            // Determine paymentMode label for display
            const paymentMode = validBankRows.length > 0 && cashAmt > 0 ? 'mixed' : validBankRows.length > 0 ? 'bank' : 'cash';
            const primaryBank = validBankRows.length > 0 ? validBankRows.map(r => r.bankName).join(', ') : '';

            // Add to purchases — status is pending until goods physically arrive
            this.purchases.unshift({ id: poId, items, amount: totalAmt, source: supplierName, date, status: 'pending', paymentMode, bankName: primaryBank, paymentRef: pm.reference, bankRows: validBankRows.map(r => ({ ...r })), cashPaid: cashAmt });

            // NOTE: Stock is NOT incremented here — it increments when Admin clicks "Arrived"

            // Record bank ledger entries (negative = money going out for purchase)
            validBankRows.forEach(row => {
                if (row.amount > 0) {
                    this.bankLedger.push({ date, ref: poId, customerName: supplierName, description: 'Purchase from ' + supplierName, amount: -row.amount, method: 'bank', bankName: row.bankName, runningBalance: 0 });
                }
            });
            if (cashAmt > 0) {
                this.bankLedger.push({ date, ref: poId, customerName: supplierName, description: 'Purchase from ' + supplierName, amount: -cashAmt, method: 'cash', bankName: '', runningBalance: 0 });
            }
            this.notifs.unshift({ title: 'Purchase Recorded', msg: poId + ' — ₦' + this.formatMoney(totalAmt) + ' from ' + supplierName });
            pm.show = false;
        },
        viewPurchaseReceipt(p) {
            const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Purchase Receipt - ${p.id}</title>
<style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;}.header{text-align:center;border-bottom:3px solid #714B67;padding-bottom:20px;margin-bottom:30px;}.header h1{color:#714B67;margin:0;}table{width:100%;border-collapse:collapse;margin:20px 0;}th{background:#714B67;color:white;padding:12px;text-align:left;}td{padding:12px;border-bottom:1px solid #ddd;}.total{font-weight:bold;font-size:18px;}.footer{margin-top:40px;padding-top:20px;border-top:2px solid #ddd;text-align:center;color:#666;font-size:12px;}</style></head><body>
<div class="header"><h1>LADU INVESTMENT</h1><p>Purchase Record</p></div>
<h2 style="color:#714B67">Purchase Receipt — ${p.id}</h2>
<p><strong>Supplier:</strong> ${p.source}</p>
<p><strong>Date:</strong> ${new Date(p.date).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})}</p>
<p><strong>Payment:</strong> ${p.paymentMode || 'N/A'}${p.bankName ? ' — ' + p.bankName : ''}</p>
<table><thead><tr><th>Item</th><th>Qty</th><th>Unit Cost</th><th>Subtotal</th></tr></thead><tbody>
${p.items.map(i=>`<tr><td>${i.name}</td><td>${i.qty}</td><td>₦${Number(i.price||0).toLocaleString()}</td><td>₦${(i.qty*(i.price||0)).toLocaleString()}</td></tr>`).join('')}
<tr class="total"><td colspan="3" style="text-align:right">TOTAL:</td><td>₦${Number(p.amount||0).toLocaleString()}</td></tr></tbody></table>
<div class="footer"><p>Generated: ${new Date().toLocaleString()}</p></div></body></html>`;
            const w = window.open('', '_blank');
            w.document.write(html);
            w.document.close();
            setTimeout(() => w.print(), 500);
        },
        downloadPurchaseReport() {
            const { doc, lw } = this.createPDFDoc('PURCHASE REPORT');
            let y = 52;
            doc.setFontSize(8); doc.setFont(undefined,'normal'); doc.setTextColor(80,80,80);
            doc.text('Date Range: ' + (this.purchaseFilters.dateFrom || 'All') + ' to ' + (this.purchaseFilters.dateTo || 'All'), 14, y); y += 8;
            const purchases = this.filteredPurchases;
            const rows = purchases.map(p => [
                p.id, this.formatDate(p.date), p.source,
                p.items.map(i => i.name + ' x' + i.qty).join('; '),
                this.pdfMoney(p.amount), p.status.toUpperCase()
            ]);
            doc.autoTable({ startY: y, head: [['Reference','Date','Source','Items','Amount (NGN)','Status']], body: rows, styles: { fontSize: 7.5, cellPadding: 2 }, headStyles: { fillColor: [113,75,103] }, alternateRowStyles: { fillColor: [248,248,248] }, theme: 'grid', margin: { left: 14, right: 14 } });
            y = doc.lastAutoTable.finalY + 8;
            const total = purchases.reduce((s,p) => s + p.amount, 0);
            doc.setFontSize(10); doc.setFont(undefined,'bold');
            doc.text('TOTAL PURCHASES: ₦' + this.formatMoney(total), 14, y);
            this.addPDFFooter(doc);
            doc.save('PurchaseReport-' + this.localDateStr() + '.pdf');
        },
        // ---- Stock Management: Block orders when stock is zero ----
        canPlaceOrder(productName) {
            const prod = this.products.find(p => p.name === productName);
            return prod && prod.stock > 0;
        },
        checkStockAvailability(productName) {
            if (!this.canPlaceOrder(productName)) {
                alert('This product is out of stock. Only Admin can place special orders.');
                return false;
            }
            return true;
        },
    },
    mounted() {
        document.addEventListener('click', () => {
            if (this.deliveryMenu.orderId) this.deliveryMenu.orderId = null;
        });
    }
}).mount('#app');
